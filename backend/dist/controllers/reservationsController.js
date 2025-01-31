"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReservation = exports.getRestaurantReservations = exports.makeReservation = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const reservations_1 = __importDefault(require("../models/reservations"));
const usermodel_1 = __importDefault(require("../models/usermodel"));
const restaurantmodel_1 = __importDefault(require("../models/restaurantmodel"));
const usermodel_2 = __importDefault(require("../models/usermodel"));
const makeReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.id;
    const { restaurantId, date, time, partySize } = req.body;
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(restaurantId)) {
            return res.status(400).json({
                message: "Invalid restaurant id"
            });
        }
        const createReservation = yield reservations_1.default.create({
            userId,
            restaurantId,
            date,
            time,
            partySize,
            status: "pending"
        });
        return res.status(201).json({
            message: "Success",
            reservation: createReservation
        });
    }
    catch (e) {
        console.log(e.message);
        return res.status(500).json({
            message: "internal server error"
        });
    }
});
exports.makeReservation = makeReservation;
const getRestaurantReservations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ownerid = req.id;
    try {
        const owner = yield usermodel_2.default.findOne({ user_id: ownerid });
        if (!owner) {
            return res.status(404).json({ message: "unauthorised" });
        }
        const reservations = yield reservations_1.default.find({ userId: ownerid });
        return res.status(200).json(reservations);
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "internal server error" });
    }
});
exports.getRestaurantReservations = getRestaurantReservations;
const getReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ownerId = req.id;
    const restaurantId = req.params.restaurantId;
    try {
        const user = yield usermodel_1.default.findOne({ user_id: ownerId });
        if (!user) {
            return res.status(403).json({ message: "unauthorised" });
        }
        if (!mongoose_1.default.Types.ObjectId.isValid(restaurantId)) {
            return res.status(400).json({ message: "invalid object id" });
        }
        const restaurant = yield restaurantmodel_1.default.findOne({ ownerId });
        if (!restaurant) {
            return res.status(403).json({ message: "unauthorised" });
        }
        const reservation = yield reservations_1.default.findOne({ _id: req.params.reservationId, restaurantId });
        if (!reservation) {
            return res.status(404).json({ message: "reservation not found" });
        }
        const client = yield usermodel_1.default.findOne({ user_id: reservation.userId }).select("-password");
        if (!client) {
            return res.status(404).json({ message: "client not found" });
        }
        return res.status(200).json({
            client: {
                name: client.username,
                email: client.email,
                phone: client.phone
            },
            reservation: {
                reservationId: reservation._id,
                date: reservation.date,
                time: reservation.time,
                partySize: reservation.partySize,
                status: reservation.status,
                createdAt: reservation.createdAt
            }
        });
    }
    catch (e) {
        console.log(e.message);
        return res.status(500).json({
            message: "internal server error",
        });
    }
});
exports.getReservation = getReservation;

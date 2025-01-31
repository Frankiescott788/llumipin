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
exports.updateRestaurant = exports.deleteRestaurant = exports.getRestaurant = exports.getRestaurants = exports.reqister = exports.HandleErrors = void 0;
const restaurantmodel_1 = __importDefault(require("../models/restaurantmodel"));
const HandleErrors = (err) => {
    const errs = {};
    if (err.message.includes("restaurant validation failed")) {
        Object.values(err.errors).forEach((error) => {
            errs[error.path] = error.message;
        });
    }
    console.log(err);
    if (err.code === 11000) {
        errs.name = "Restaurant name should be unique";
    }
    return errs;
};
exports.HandleErrors = HandleErrors;
const reqister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, contactNumber, cuisine, photos, description, address, openingHours, averageRating } = req.body;
    const ownerId = req.id;
    if (!name || !contactNumber || !cuisine || !photos || !description || !address || !ownerId || !openingHours || !averageRating) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const registerRes = yield restaurantmodel_1.default.create({
            name,
            contactNumber,
            cuisine,
            photos,
            description,
            address,
            ownerId,
            openingHours,
            averageRating
        });
        return res.status(201).json({
            message: "Restaurant registered successfully",
            data: registerRes
        });
    }
    catch (e) {
        const { name, contactNumber, cuisine, photos, description, address, openingHours, averageRating } = (0, exports.HandleErrors)(e);
        if (name || contactNumber || cuisine || photos || description || address || openingHours || averageRating) {
            return res.status(400).json({
                message: "Validation error",
                details: (0, exports.HandleErrors)(e)
            });
        }
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});
exports.reqister = reqister;
const getRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield restaurantmodel_1.default.find({});
        if (restaurants.length === 0) {
            return res.status(404).json({ message: "No restaurant yet" });
        }
        return res.status(200).json(restaurants);
    }
    catch (e) {
        console.log(e.message);
        return res.status(500).json({
            message: "internal server error",
            details: e.message
        });
    }
});
exports.getRestaurants = getRestaurants;
const getRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { restaurantid } = req.params;
    try {
        const restaurant = yield restaurantmodel_1.default.findById(restaurantid);
        if (!restaurant) {
            return res.status(404).json({
                message: "restaurant not found"
            });
        }
        return res.status(200).json(restaurant);
    }
    catch (e) {
        console.log(e.message);
        return res.status(500).json({
            message: "internal server error"
        });
    }
});
exports.getRestaurant = getRestaurant;
const deleteRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { restaurantid } = req.params;
    const ownerid = req.id;
    try {
        const restaurant = yield restaurantmodel_1.default.findByIdAndDelete(restaurantid);
        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found"
            });
        }
        return res.status(200).json({
            message: "Restaurant deleted successfully"
        });
    }
    catch (e) {
        console.log(e.message);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});
exports.deleteRestaurant = deleteRestaurant;
const updateRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { restaurantid } = req.params;
    const updates = req.body;
    try {
        const restaurant = yield restaurantmodel_1.default.findByIdAndUpdate(restaurantid, updates, { new: true, runValidators: true });
        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found"
            });
        }
        return res.status(200).json({
            message: "Restaurant updated successfully",
            data: restaurant
        });
    }
    catch (e) {
        console.log(e.message);
        return res.status(500).json({
            message: "Internal server error",
            details: (0, exports.HandleErrors)(e)
        });
    }
});
exports.updateRestaurant = updateRestaurant;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const useAuthentication_1 = __importDefault(require("../middlewares/useAuthentication"));
const restaurantController_1 = require("../controllers/restaurantController");
const reservationsController_1 = require("../controllers/reservationsController");
const paymentController_1 = require("../controllers/paymentController");
const router = (0, express_1.Router)();
// auth routes
router.post("/api/signup", users_1.signup);
router.post("/api/signin", users_1.signin);
router.get("/api/session", useAuthentication_1.default, users_1.currentuser);
router.delete("/api/user", useAuthentication_1.default, users_1.deleteUser);
router.patch("/api/user", useAuthentication_1.default, users_1.updateUser);
router.get("/api/signout", useAuthentication_1.default, users_1.signout);
// restaurant routes
router.post("/api/restaurants", useAuthentication_1.default, restaurantController_1.reqister);
router.get("/api/restaurants", useAuthentication_1.default, restaurantController_1.getRestaurants);
router.get("/api/restaurants/:restaurantid", useAuthentication_1.default, restaurantController_1.getRestaurant);
router.delete("/api/restaurants/:restaurantid", useAuthentication_1.default, restaurantController_1.deleteRestaurant);
router.patch("/api/restaurants/:restaurantid", useAuthentication_1.default, restaurantController_1.updateRestaurant);
// reservation router
router.post("/api/reservation", useAuthentication_1.default, reservationsController_1.makeReservation);
router.get("/api/reservation", useAuthentication_1.default, reservationsController_1.getRestaurantReservations);
router.get("/api/reservation/:restaurantId/:reservationId", useAuthentication_1.default, reservationsController_1.getReservation);
// payment routes
router.post("/api/payment/", useAuthentication_1.default, paymentController_1.createOrder);
router.post("/api/payment/:restaurantId/:reservationId", paymentController_1.capturePayment);
exports.default = router;

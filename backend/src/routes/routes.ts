import {Router} from "express";
import {currentuser, deleteUser, signin, signout, signup, updateUser} from "../controllers/users";
import useAuth from "../middlewares/useAuthentication";
import {
    deleteRestaurant,
    getRestaurant,
    getRestaurants,
    reqister,
    updateRestaurant
} from "../controllers/restaurantController";
import {getReservation, getRestaurantReservations, makeReservation} from "../controllers/reservationsController";
import {capturePayment, createOrder} from "../controllers/paymentController";

const router = Router();

// auth routes
router.post("/api/signup", signup);
router.post("/api/signin", signin);
router.get("/api/session", useAuth, currentuser);
router.delete("/api/user", useAuth, deleteUser);
router.patch("/api/user", useAuth, updateUser);
router.get("/api/signout", useAuth, signout);

// restaurant routes
router.post("/api/restaurants", useAuth, reqister);
router.get("/api/restaurants", useAuth, getRestaurants);
router.get("/api/restaurants/:restaurantid", useAuth, getRestaurant);
router.delete("/api/restaurants/:restaurantid", useAuth, deleteRestaurant);
router.patch("/api/restaurants/:restaurantid", useAuth,updateRestaurant);

// reservation router
router.post("/api/reservation", useAuth ,makeReservation);
router.get("/api/reservation", useAuth, getRestaurantReservations);
router.get("/api/reservation/:restaurantId/:reservationId", useAuth, getReservation);

// payment routes
router.post("/api/payment/", useAuth, createOrder);
router.post("/api/payment/:restaurantId/:reservationId", capturePayment);
export default router
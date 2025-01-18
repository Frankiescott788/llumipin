import {Request, Response} from "express";
import mongoose from "mongoose";
import {IReservation} from "../types";
import Reservations from "../models/reservations";
import reservations from "../models/reservations";
import Restaurantmodel from "../models/restaurantmodel";
import UserModel from "../models/usermodel";

export const makeReservation = async (req : Request, res : Response):Promise<Response> => {
    const userId = req.id;
    const { restaurantId , date, time, partySize }: IReservation = req.body

    try {
        if (!mongoose.Types.ObjectId.isValid(restaurantId as mongoose.Types.ObjectId)){
            return res.status(400).json({
                message : "Invalid restaurant id"
            });
        }

        const createReservation = await Reservations.create({
            userId,
            restaurantId,
            date,
            time,
            partySize,
            status : "pending"
        });

        return res.status(201).json({
            message : "Success",
            reservation : createReservation
        })

    } catch (e : any) {
        console.log(e.message);
        return res.status(500).json({
            message : "internal server error"
        })
    }
};

export const getRestaurantReservations = async (req : Request, res : Response): Promise<Response> => {

    const restaurantId = req.params.restaurantId;

    try {
        if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
            return res.status(400).json({ message : "Invalid object id" });
        }

        const reservations = await Reservations.find({ restaurantId });

        return res.status(200).json(reservations);

    } catch(err : any) {
        console.log(err.message);
        return res.status(500).json({ message : "internal server error" });
    }
}

export const getReservation = async (req : Request, res : Response): Promise<Response> => {
    const reservationId = req.params.reservationId;

    try {
        if(!mongoose.Types.ObjectId.isValid(reservationId)) {
            return res.status(400).json({
                message : "invalid object id"
            });
        }

        const reservation = await Reservations.findById(reservationId);

        if (!reservation) {
            return res.status(404).json({
                message : "reservation not found"
            });
        }

        const user = await UserModel.findOne({ user_id : reservation.userId});
        if(!user) {
            return res.status(404).json({ message : "user not found" })
        }

        return res.status(200).json({
            client : {
                name : user.username,
                email : user.email,
                phone : user.phone
            },
            details : {
                id : reservation._id,
                date : reservation.date,
                time : reservation.time,
                partySize : reservation.partySize,
                status : reservation.status
            }
        })

    } catch (e : any) {
        console.log(e.message);
        return res.status(500).json({
            message : "internal server error",
        })
    }
};


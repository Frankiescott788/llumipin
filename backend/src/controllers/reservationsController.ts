import {Request, Response} from "express";
import mongoose from "mongoose";
import {IReservation} from "../types";
import Reservations from "../models/reservations";
import reservations from "../models/reservations";
import Restaurantmodel from "../models/restaurantmodel";
import UserModel from "../models/usermodel";
import Restaurant from "../models/restaurantmodel";
import Usermodel from "../models/usermodel";

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

    const ownerid = req.id;

    try {
        const owner = await Usermodel.findOne({ user_id : ownerid });
        if (!owner) {
            return res.status(404).json({ message : "unauthorised" });
        }
        const reservations = await Reservations.find({ userId: ownerid });

        return res.status(200).json(reservations);

    } catch(err : any) {
        console.log(err.message);
        return res.status(500).json({ message : "internal server error" });
    }
}

export const getReservation = async (req : Request, res : Response): Promise<Response> => {
    const ownerId = req.id;
    const restaurantId = req.params.restaurantId;
    try {

        const user = await UserModel.findOne({ user_id : ownerId });
        if (!user) {
            return res.status(403).json({ message : "unauthorised" });
        }

        if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
            return res.status(400).json({message : "invalid object id"})
        }
        
        const restaurant = await Restaurant.findOne({ ownerId });

        if (!restaurant) {
            return res.status(403).json({ message : "unauthorised" });
        }

        const reservation = await Reservations.findOne({ _id : req.params.reservationId, restaurantId });

        if (!reservation) {
            return res.status(404).json({ message : "reservation not found" })
        }

        const client = await UserModel.findOne( { user_id : reservation.userId } ).select("-password");
        if (!client) {
            return res.status(404).json({ message : "client not found" });
        }
        return res.status(200).json({
            client : {
                name : client.username,
                email : client.email,
                phone : client.phone
            },
            reservation : {
                reservationId : reservation._id,
                date : reservation.date,
                time : reservation.time,
                partySize : reservation.partySize,
                status : reservation.status,
                createdAt : reservation.createdAt
            }
        })

    } catch (e : any) {
        console.log(e.message);
        return res.status(500).json({
            message : "internal server error",
        })
    }
};


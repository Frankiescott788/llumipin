import {Request, Response} from "express";
import {Restaurant} from "../types";
import Restaurantmodel from "../models/restaurantmodel";

export const HandleErrors = (err: any) => {
    const errs: any = {};

    if (err.message.includes("restaurant validation failed")) {
        Object.values(err.errors).forEach((error: any) => {
            errs[error.path] = error.message;
        });
    }

    console.log(err)

    if (err.code === 11000) {
        errs.name = "Restaurant name should be unique";
    }

    return errs;
};

export const reqister = async (req: Request, res: Response): Promise<Response> => {
    const {
        name,
        contactNumber,
        cuisine,
        photos,
        description,
        address,
        openingHours,
        averageRating
    }: Restaurant = req.body;
    const ownerId = req.id;
    if (!name || !contactNumber || !cuisine || !photos || !description || !address || !ownerId || !openingHours || !averageRating) {
        return res.status(400).json({message: "All fields are required"});
    }
    try {
        const registerRes = await Restaurantmodel.create({
            name,
            contactNumber,
            cuisine,
            photos,
            description,
            address,
            ownerId,
            openingHours,
            averageRating
        })

        return res.status(201).json({
            message: "Restaurant registered successfully",
            data: registerRes
        });

    } catch (e: any) {
        const { name, contactNumber, cuisine, photos, description, address, openingHours, averageRating } = HandleErrors(e);

        if (name || contactNumber || cuisine || photos || description || address || openingHours || averageRating) {
            return res.status(400).json({
            message: "Validation error",
            details: HandleErrors(e)
            });
        }
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const getRestaurants = async (req : Request, res : Response): Promise<Response> => {
    try {
        const restaurants = await Restaurantmodel.find({});
        if (restaurants.length === 0) {
            return res.status(404).json({ message : "No restaurant yet" });
        }

        return res.status(200).json(restaurants);

    } catch (e : any) {
        console.log(e.message);
        return res.status(500).json({
            message : "internal server error",
            details : e.message
        })
    }
};

export const getRestaurant = async (req : Request, res : Response): Promise<Response> => {
    const { restaurantid } = req.params;
    try {
        const restaurant = await Restaurantmodel.findById( restaurantid );
        if (!restaurant) {
            return res.status(404).json({
                message : "restaurant not found"
            });
        }

        return res.status(200).json(restaurant);

    } catch (e : any) {
        console.log(e.message);
        return res.status(500).json({
            message : "internal server error"
        })
    }
}

export const deleteRestaurant = async (req: Request, res: Response): Promise<Response> => {
    const { restaurantid } = req.params;
    const ownerid = req.id;
    try {

        const restaurant = await Restaurantmodel.findByIdAndDelete(restaurantid);
        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found"
            });
        }
        return res.status(200).json({
            message: "Restaurant deleted successfully"
        });

    } catch (e: any) {
        console.log(e.message);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const updateRestaurant = async (req: Request, res: Response): Promise<Response> => {
    const { restaurantid } = req.params;
    const updates = req.body;
    try {
        const restaurant = await Restaurantmodel.findByIdAndUpdate(restaurantid, updates, { new: true, runValidators: true });
        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found"
            });
        }

        return res.status(200).json({
            message: "Restaurant updated successfully",
            data: restaurant
        });

    } catch (e: any) {
        console.log(e.message);
        return res.status(500).json({
            message: "Internal server error",
            details: HandleErrors(e)
        });
    }
};
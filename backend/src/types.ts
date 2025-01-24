import mongoose from "mongoose";

export interface User {
    user_id? : string,
    username : string,
    email : string,
    phone : string,
    role : string,
    password : string
}

interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

interface Review {
    userId: string; // ObjectId as a string
    rating: number;
    comment: string;
    createdAt: Date;
}



export interface Restaurant {
    name: string;
    ownerId?: string; // ObjectId as a string
    address: Address;
    contactNumber: string;
    cuisine: string[]; // Array of cuisine interfaces, e.g., ["Italian", "Mexican"]
    openingHours: string;
    photos: string[]; // Array of URLs for images
    description: string;
    averageRating: number
}

export interface IReservation  {
    restaurantId?: mongoose.Types.ObjectId;
    userId?: string;
    date: string;
    time: string;
    partySize: number;
    status?: "confirmed" | "cancelled" | "pending";
}
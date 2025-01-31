"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const restaurantSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "restaurant name is required"],
        unique: true,
    },
    ownerId: {
        type: String,
        required: [true, "Owner id is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    openingHours: { type: String, required: true },
    contactNumber: {
        type: String,
        required: [true, "Contact number is required"],
    },
    cuisine: {
        type: [String],
        required: [true, "cuisine is required"],
    },
    averageRating: [Number],
}, { timestamps: true });
const Restaurant = (0, mongoose_1.model)("restaurant", restaurantSchema);
exports.default = Restaurant;

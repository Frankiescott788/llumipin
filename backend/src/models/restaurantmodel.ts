import { model, Schema } from "mongoose";

const restaurantSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

const Restaurant = model("restaurant", restaurantSchema);

export default Restaurant;

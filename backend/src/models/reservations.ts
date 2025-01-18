import mongoose, {model, Schema} from "mongoose";

const reservationSchema = new Schema({
    restaurantId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    partySize: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["confirmed", "cancelled", "pending"],
        required: true
    }
}, {timestamps: true});

const Reservations = model("reservations", reservationSchema);

export default Reservations
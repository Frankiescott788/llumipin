import mongoose, {model, Schema} from "mongoose";

const paymentSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    restaurantId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    reservationId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["successful", "failed"],
        required: true
    }
}, { timestamps: true });

const Payment = model("payments", paymentSchema);

export default Payment;
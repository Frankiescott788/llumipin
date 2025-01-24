import { Request, Response } from "express";
import paypal from "@paypal/checkout-server-sdk";
import Payment from "../models/payments";

// Configure PayPal
const environment = new paypal.core.SandboxEnvironment(
    'ASAMJTODZlQP4ZfjBAiEsfndZkbUOv7kCPaTXPKBypHFdg3FaXyVO0t1FYLvfdjhijZSpoKQkAAIMFIg',     // Replace with your sandbox client ID
    'EJvTtTY8_Zrq_CMxcaAGtX2WBlPxDAI-I6ayeuwmPgEmDKWqVZw1Kw99NkD0qPe1Tp-HQ70AuHBDxChf'     // Replace with your sandbox secret key
);
const client = new paypal.core.PayPalHttpClient(environment);

export const createOrder = async (req: Request, res: Response): Promise<Response> => {
    try {
        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer("return=representation");

        request.requestBody({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: req.body.amount,
                    },
                },
            ],
        });

        const order = await client.execute(request);

        const approvalLink = order.result.links.find(
            (link) => link.rel === "approve"
        )?.href;

        if (!approvalLink) {
            return res.status(500).json({ message: "Approval link not found." });
        }

        return res.json({
            orderID: order.result.id,
            approvalLink,
        });
    } catch (err: any) {
        console.error("Error creating PayPal order:", err);
        return res.status(500).json({ message: "Internal server error." });
    }
};


export const capturePayment = async (req: Request, res: Response): Promise<Response> => {
    const { orderID } = req.body;

    if (!orderID) {
        return res.status(400).json({ message: "Order ID is required." });
    }

    try {
        const request = new paypal.orders.OrdersCaptureRequest(orderID);
        request.requestBody({}); // PayPal requires an empty body for capture requests

        const capture = await client.execute(request);

        const purchaseUnit = capture.result.purchase_units[0];
        const paymentStatus = capture.result.status;

        const savePayment = await Payment.create({
            userId: req.id,
            restaurantId: req.params.restaurantId,
            reservationId: req.params.reservationId,
            orderID,
            amount: purchaseUnit.amount.value,
            status: paymentStatus,
        });

        return res.json({
            orderID,
            status: paymentStatus,
            savePayment,
        });
    } catch (err: any) {
        console.error("Error capturing payment:", err);
        return res.status(500).json({ message: "Internal server error." });
    }
};

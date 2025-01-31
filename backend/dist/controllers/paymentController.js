"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.capturePayment = exports.createOrder = void 0;
const checkout_server_sdk_1 = __importDefault(require("@paypal/checkout-server-sdk"));
const payments_1 = __importDefault(require("../models/payments"));
// Configure PayPal
const environment = new checkout_server_sdk_1.default.core.SandboxEnvironment('ASAMJTODZlQP4ZfjBAiEsfndZkbUOv7kCPaTXPKBypHFdg3FaXyVO0t1FYLvfdjhijZSpoKQkAAIMFIg', // Replace with your sandbox client ID
'EJvTtTY8_Zrq_CMxcaAGtX2WBlPxDAI-I6ayeuwmPgEmDKWqVZw1Kw99NkD0qPe1Tp-HQ70AuHBDxChf' // Replace with your sandbox secret key
);
const client = new checkout_server_sdk_1.default.core.PayPalHttpClient(environment);
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const request = new checkout_server_sdk_1.default.orders.OrdersCreateRequest();
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
        const order = yield client.execute(request);
        const approvalLink = (_a = order.result.links.find((link) => link.rel === "approve")) === null || _a === void 0 ? void 0 : _a.href;
        if (!approvalLink) {
            return res.status(500).json({ message: "Approval link not found." });
        }
        return res.json({
            orderID: order.result.id,
            approvalLink,
        });
    }
    catch (err) {
        console.error("Error creating PayPal order:", err);
        return res.status(500).json({ message: "Internal server error." });
    }
});
exports.createOrder = createOrder;
const capturePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderID } = req.body;
    if (!orderID) {
        return res.status(400).json({ message: "Order ID is required." });
    }
    try {
        const request = new checkout_server_sdk_1.default.orders.OrdersCaptureRequest(orderID);
        request.requestBody({}); // PayPal requires an empty body for capture requests
        const capture = yield client.execute(request);
        const purchaseUnit = capture.result.purchase_units[0];
        const paymentStatus = capture.result.status;
        const savePayment = yield payments_1.default.create({
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
    }
    catch (err) {
        console.error("Error capturing payment:", err);
        return res.status(500).json({ message: "Internal server error." });
    }
});
exports.capturePayment = capturePayment;

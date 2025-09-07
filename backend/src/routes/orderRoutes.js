import express from "express";
import { ADMIN, MERCHANT } from "../constants/roles.js";
import roleBasedAuth from "../middlewares/rolebasedAuth.js";
import orderController from "../controllers/orderController.js";

const router = express.Router();

router.get("/", roleBasedAuth(ADMIN), orderController.getOrders);
router.get("/", orderController.getOrdersByUser);
router.get(
  "/merchant",
  roleBasedAuth(MERCHANT),
  orderController.getOrderOfMerchant
);
router.get("/:id", roleBasedAuth(ADMIN), orderController.getOrderById);
router.post("/", orderController.createOrder);

router.put("/:id", orderController.updateOrder);

router.delete("/:id", orderController.deleteOrder);

// URL: /api/orders/:id/payment/khalti
router.post("/:id/payment/khalti", orderController.orderPaymentViaKhalti);

router.put("/:id/confirm-payment", orderController.confirmOrderPayment);

export default router;

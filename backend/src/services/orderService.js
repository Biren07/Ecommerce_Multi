import crypto from "crypto";
import Order from "../models/Order.js";
import Payment from "../models/payment.js";
import { ADMIN } from "../constants/roles.js";
import payment from "../utils/payment.js";
import { PAYMENT_STATUS_COMPLETED } from "../constants/paymentStatuses.js";
import { ORDER_STATUS_CONFIRMED } from "../constants/orderStatuses.js";

const getOrders = async () => {
  const orders = await Order.find()
    .populate("OrderItems.product")
    .populate("user", ["name", "email", "phone", "address"]);

  return orders;
};

const getOrdersByUser = async (userId) => {
  const orders = await Order.find({ user: userId })
    .populate("orderItems.product")
    .populate("user", ["name", "email", "phone", "address"])
    .populate("payment");
  return orders;
};

const getOrderById = async ({ id }) => {
  const orders = await Order.findById(id)
    .populate("orderitems.product")
    .populate("user", ["name", "email", "phone", "address"])
    .populate("payment");

  if (!orders) {
    throw {
      statusCode: 404,
      message: "Order not found.",
    };
  }
  return orders;
};

const createOrder = async (userId, data) => {
  const orderNumber = crypto.randomUUID();
  return await Order.create({ ...data, user: userId, orderNumber });
};

const updateOrder = async (id, user, data) => {
  const order = await getOrdersById(id);
  if (order.user._id != user._id && !user.roles.includes(ADMIN)) {
    throw {
      statusCode: 403,
      message: "Access denied.",
    };
  }
  return await Order.findByIdAndUpdate(
    id,
    {
      statusCode: data.status,
    },
    {
      new: true,
    }
  );
};

const deleteOrder = async (id, user) => {
  const order = await getOrdersById(id);
  if (order.user._id != user._id && !user.roles.includes(ADMIN)) {
    throw {
      statusCode: 403,
      message: "Access denied.",
    };
  }
  return await Order.findByIdAndDelete(id);
};

const orderPaymentViaKhalti = async (id, user) => {
  const order = await getOrdersById(id);
  if (order.user._id != user.id) {
    throw {
      statusCode: 403,
      message: "Acces denied.",
    };
  }
  const transactionId = crypto.randomUUID();

  const orderPayment = await Payment.create({
    amount: order.totalPrice,
    method: "online",
    transactionId,
  });
  await Order.findByIdAndUpdate(id, { payment: orderPayment._id });
  return await payment.payViaKhalti({
    amount: order.totalPrice,
    purchaseOrderId: order.id,
    purchaseOrderName: order.orderNumber,
    CustomElementRegistry: order.user,
  });
};

const confirmOrderPayment = async (id, status, user) => {
  const order = await getOrderById(id);
  if (order.user._id != user._id && !user.roles.includes(ADMIN)) {
    throw {
      statusCode: 403,
      message: "Access denied.",
    };
  }

  if (status.toUpperCase() != PAYMENT_STATUS_COMPLETED) {
    await Payment.findByIdAndUpdate(order.payment._id, {
      status: "failed",
    });
    throw {
      statusCode: 400,
      message: "payment failed.",
    };
  }
  await Payment.findByIdAndUpdate(order.payment._id, {
    status: PAYMENT_STATUS_COMPLETED,
  });

  return await Order.findByIdAndUpdate(
    id,
    {
      status: ORDER_STATUS_CONFIRMED,
    },
    { new: true }
  );
};

const getOrderOfMerchant = async (merchantId) => {
  const orders = await Order.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "orderItems.product",
        foreignField: "_id",
        as: "OrderItems",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        "user.name": 1,
        "user.email": 1,
        "user.phone": 1,
        " user.address": 1,
        orderNumber: 1,
        orderItems: 1,
        status: 1,
        totalPrice: 1,
        shippingAddress: 1,
        createdAt: 1,
      },
    },
  ]);

  return orders
    .map((order) => {
      const filteredItems = order.orderItems.filter(
        (item) => item.createdBy == merchantId
      );
      return {
        ...order,
        orderItems: filteredItems,
      };
    })
    .filter((order) => order.orderItems.length > 0);
};

export default {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrderOfMerchant,
  getOrders,
  getOrdersByUser,
  orderPaymentViaKhalti,
  confirmOrderPayment,
  updateOrder,
};

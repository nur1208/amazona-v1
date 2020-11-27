import express from "express";
import expressAsyncHandler from "express-async-handler";
import OrderModal from "../models/orderModel.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length <= 0) {
      res.status(400).send({ message: "Cart Is Empty" });
    } else {
      const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      } = req.body;
      const order = new OrderModal({
        orderItems,
        shippingAddress,
        paymentMethod,
        itemPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        user: req.user._id,
      });
      const createOrder = await order.save();
      res
        .status(201)
        .send({ message: "New Order Created", order: createOrder });
    }
  })
);

orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await OrderModal.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(401).send({ message: "Order Not Found" });
    }
  })
);

export default orderRouter;

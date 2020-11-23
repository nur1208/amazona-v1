import express from "express";
import expressAsyncHandler from "express-async-handler";
import productModel from "../models/prodcutModel.js";

const productRouter = express.Router();

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await productModel.find({});
    res.send(products);
  })
);
productRouter.post(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const createdProducts = await productModel.insertMany(req.body.products);
    res.send({ createdProducts });
  })
);
export default productRouter;

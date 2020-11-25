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

productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await productModel.findById(req.params.id);
    res.send(product);
  })
);
export default productRouter;

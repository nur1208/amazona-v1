import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import UserModal from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils.js";

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const userCreated = await UserModal.insertMany(data.users);
    res.send({ userCreated });
  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await UserModal.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(404).send({ message: "Invalid Email or password" });
  })
);

export default userRouter;

import express from "express";
import productRouter from "./routers/productsRouter.js";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//TODO learn mongoose. connect method
mongoose.connect(process.env.MONGO || "mongodb://localhost/amazona-v1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
app.use("/api/users", userRouter);

app.use("/api/products", productRouter);

app.get("/", (req, res) => {
  res.send("server ready yeah");
});
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log("server at http://localhost:" + port);
});

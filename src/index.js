import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRouter from "./product/product.controller.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

app.use("/products", productRouter)


app.listen(PORT, () => {
  console.log(`listening port at http://localhost:${PORT}`);
});

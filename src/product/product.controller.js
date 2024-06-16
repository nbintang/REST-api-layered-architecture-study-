// Layer untuk handle request dan response saja
// biasanya juga handle validasi body
import express from "express";
import prisma from "../database/index.js";
import {
  createProduct,
  deleteProductByid,
  getAllProducts,
  getProductById,
  editProductById,
} from "./product.service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getAllProducts();
  res.send(products);
});

router.get("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await getProductById(parseInt(productId));
    res.send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const newProductData = req.body;

    const product = await createProduct(newProductData);

    res.send({
      data: product,
      message: "create product success",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteProductByid(parseInt(id));
    res.send("product deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const productData = req.body;

  if (
    !(
      productData.image &&
      productData.description &&
      productData.name &&
      productData.price
    )
  ) {
    res.status(400).send("Some Field Are Missing!");
    return;
  }

  const product = await editProductById(parseInt(id), productData)
  

  res.send({
    data: product,
    message: "product updated!",
  });
});

router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const productData = req.body;

    const product = await editProductById(parseInt(id), productData);

    res.send({
      data: product,
      message: "product updated!",
    });
  } catch (error) {
    res.send(error.message);
  }
});

export default router;

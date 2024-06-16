// Handle business logic di service saja
// kenapa dipisah? supaya tanggung jawab nya terpisah dan kodingannya resasble

import { deleteProduct, editProduct, findProduct, findProductById, insertProduct } from "./product.repository.js";

export const getAllProducts = async () => {
  const products = await findProduct(); 
  return products;
};

export const getProductById = async (id) => { 
  const product = await findProductById(id)

  if (!product) throw Error("product not found");

  return product;
};

export const createProduct = async (newProductData) => {
  const product = await insertProduct(newProductData);
  
  return product;
};

export const deleteProductByid = async (id) => {
  await getProductById(id);
  await deleteProduct(id);
};


export const  editProductById = async (id, productData) =>{
  await getProductById(id)
  const product = await editProduct(id, productData);
  return product;
} 

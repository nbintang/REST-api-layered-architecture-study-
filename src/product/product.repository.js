import prisma from "../database/index.js";

export const findProduct = async () => {
  const product = prisma.product.findMany();
  return product;
};

export const findProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  return product;
};

export const insertProduct = async (newProductData) => {
  const product = await prisma.product.create({
    data: {
      name: newProductData.name,
      description: newProductData.description,
      image: newProductData.image,
      price: newProductData.price,
    },
  });

return product
}

export const deleteProduct = async (id) => {
  await prisma.product.delete({
    where: {
      id,
    },
  });
};


export const  editProduct = async (id, productData) =>{
  const product = await prisma.product.update({
    where: {
      id,
    },
    data: {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      image: productData.image,
    },
  });

  return product;
} 



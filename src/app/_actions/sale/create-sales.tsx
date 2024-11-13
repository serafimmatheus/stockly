"use server";

import { db } from "@/app/_lib/prisma-client";
import { CreateSale, createSaleSchema } from "./schema";
import { revalidateTag } from "next/cache";

const createSales = async (data: CreateSale) => {
  createSaleSchema.parse(data);

  const sale = await db.sale.create({
    data: {
      date: new Date(),
    },
  });

  for (const product of data.products) {
    const productFromDb = await db.product.findUnique({
      where: {
        id: product.id,
      },
    });

    if (!productFromDb) {
      throw new Error("Product not found");
    }

    const productsIsOutOfStock = product.quantity > productFromDb.stock;

    if (productsIsOutOfStock) {
      throw new Error("Product is out of stock");
    }

    await db.product.update({
      where: {
        id: product.id,
      },
      data: {
        stock: {
          decrement: product.quantity,
        },
      },
    });

    await db.saleProduct.create({
      data: {
        saleId: sale.id,
        productId: product.id,
        quantity: product.quantity,
        unitPrice: productFromDb.price,
      },
    });
  }

  revalidateTag("get-products");

  return null;
};

export { createSales };

"use server";
import { db } from "@/app/_lib/prisma-client";
import { Product } from "@prisma/client";
import { revalidateTag } from "next/cache";

interface UpdateProductIPros {
  id: string;
  data: Partial<Product>;
}

export const updateProduct = async ({ id, data }: UpdateProductIPros) => {
  const isProductExist = await db.product.findUnique({
    where: {
      id,
    },
  });

  if (!isProductExist) {
    throw new Error("Produto não encontrado");
  }

  await db.product.update({
    where: {
      id,
    },
    data,
  });

  revalidateTag("get-products");
};

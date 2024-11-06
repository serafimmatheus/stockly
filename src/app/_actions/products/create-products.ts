"use server";

import { db } from "@/app/_lib/prisma-client";
import { revalidateTag } from "next/cache";
import { FormCreateProducts, formSchemaCreateProducts } from "./products.DTO";

export const createProduct = async (data: FormCreateProducts) => {
  formSchemaCreateProducts.parse(data);

  const newSlug = data.name.replace(/\s/g, "-").toLowerCase();

  await db.product.create({
    data: {
      name: data.name,
      price: data.price,
      stock: data.stock,
      slug: newSlug,
    },
  });

  revalidateTag("get-products");
};

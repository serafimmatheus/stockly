import "server-only";

import { db } from "@/app/_lib/prisma-client";
import { Product } from "@prisma/client";
import { unstable_cache } from "next/cache";
import { cache } from "react";

export const getProducts = unstable_cache(
  async (): Promise<Product[]> => {
    const products = await db.product.findMany();
    return products;
  },
  ["getProducts"],
  {
    tags: ["get-products"],
  },
);

// independentemente de onde a função getProducts seja chamada, uma, duas, tres e quantas forem, ela sempre será chamada uma unica vez.
export const getProductsComCache = cache(async (): Promise<Product[]> => {
  const products = await db.product.findMany();
  return products;
});

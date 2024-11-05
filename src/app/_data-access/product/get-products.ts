import "server-only";

import { db } from "@/app/_lib/prisma-client";
import { Product } from "@prisma/client";

export const getProducts = async (): Promise<Product[]> => {
  const products = await db.product.findMany();
  return products;
};

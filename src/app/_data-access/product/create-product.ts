import "server-only";

import { db } from "@/app/_lib/prisma-client";
import { Product } from "@prisma/client";

interface CreateProductIProps {
  data: Product;
}

export const createProduct = async ({
  data,
}: CreateProductIProps): Promise<Product> => {
  const products = await db.product.create({
    data,
  });

  return products;
};

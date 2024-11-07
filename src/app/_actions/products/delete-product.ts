"use server";

import { db } from "@/app/_lib/prisma-client";
import { revalidateTag } from "next/cache";

export const deleteProduct = async (id: string) => {
  await db.product.delete({
    where: {
      id,
    },
  });

  revalidateTag("get-products");
};

"use server";

import { db } from "@/app/_lib/prisma-client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const formSchemaCreateProducts = z.object({
  name: z
    .string()
    .trim()
    .min(2, {
      message: "Nome do produto deve conter no mínimo 2 caracteres",
    })
    .max(50, {
      message: "Nome do produto deve conter no máximo 50 caracteres",
    }),
  slug: z
    .string()
    .trim()
    .min(2, {
      message: "Nome do produto deve conter no mínimo 2 caracteres",
    })
    .max(50, {
      message: "Nome do produto deve conter no máximo 50 caracteres",
    }),
  price: z.number().min(0.01, {
    message: "Valor unitário deve ser maior que 0.01",
  }),
  stock: z.coerce.number().positive().int().min(0, {
    message: "Estoque deve ser maior que 0",
  }),
});

export type FormCreateProducts = z.infer<typeof formSchemaCreateProducts>;

export const createProduct = async (data: FormCreateProducts) => {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const newSlug = data.name.replace(/\s/g, "-").toLowerCase();

  await db.product.create({
    data: {
      name: data.name,
      price: data.price,
      stock: data.stock,
      slug: newSlug,
    },
  });

  revalidatePath("/produtos");
};

import { z } from "zod";

export const formSchemaCreateProducts = z.object({
  id: z.string().uuid().optional(),
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

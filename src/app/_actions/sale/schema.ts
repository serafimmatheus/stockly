import { z } from "zod";

export const createSaleSchema = z.object({
  products: z.array(
    z.object({
      id: z.string(),
      quantity: z.coerce.number().int().positive(),
    }),
  ),
});

export type CreateSale = z.infer<typeof createSaleSchema>;

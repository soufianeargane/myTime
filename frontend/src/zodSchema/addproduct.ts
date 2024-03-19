import z from "zod";

export const addProductSchema = z.object({
  name: z.string().min(3).max(255),
  price: z.string().min(1),
  category: z.string().min(3).max(255),
  description: z.string().min(10).max(255),
  quantity: z.string().min(1),
});

export type AddProduct = z.infer<typeof addProductSchema>;

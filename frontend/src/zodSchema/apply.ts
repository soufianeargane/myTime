import z from "zod";

export const applySchema = z.object({
  name: z.string().min(3).max(255),
  address: z.string().min(10).max(255),
  phone: z.string().min(8),
});

export type Apply = z.infer<typeof applySchema>;

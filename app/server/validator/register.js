import { z } from "zod";

export const registerSchema = z.object({
  password: z.string(),
  email: z.string().email()
});
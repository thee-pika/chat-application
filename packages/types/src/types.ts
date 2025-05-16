import z from "zod";

export const userSchema = z.object({
  username: z.string(),
  avatar: z.string().optional(),
  bio: z.string().optional(),
});

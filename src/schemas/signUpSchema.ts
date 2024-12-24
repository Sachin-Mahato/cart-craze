import { z } from "zod";

export const userNameValidation = z
  .string()
  .min(3, "username must be at least 2 characters")
  .max(20, "username must be under 20 characters")
  .regex(/^[a-zA-Z0-9]+$/, "username must not contain special characters");

export const signUpSchema = z.object({
  username: userNameValidation,
  email: z.string().email({ message: "invalid email address" }),
  password: z
    .string()
    .min(6, { message: "password must be at least 6 characters" }),
});

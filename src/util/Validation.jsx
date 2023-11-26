import { z } from "zod";

export const User = z.object({
  email: z.string().email({ message: "Пожалуйста, введите правильный email" }),
  password: z
    .string()
    .min(8, { message: "Пароль должен содержать 8 символов" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message: "Пароль не подходит",
    }),
});

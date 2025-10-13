import z from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, { error: "Name is too short." }).max(50),
    email: z.email({ error: "Invalid email address." }),
    password: z.string().min(6, { error: "Password too short" }),
    confirmPassword: z.string().min(6, { error: "Password too short" }),
    role: z.enum(["SENDER","RECEIVER"], { error: "This is error" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password not matched.",
    path: ["confirmPassword"],
  });


  export const loginSchema = z.object({
  email: z.email({ error: "Invalid email address." }),
  password: z.string().min(6, { error: "Password too short" }),
});
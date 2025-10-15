import z from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1,{error:"Name is required."}).min(3, { error: "Name is too short." }).max(30,{ error: "Name will be max 30 character." }),
    email: z.email({ error: "Invalid email address." }),
    password: z.string().min(8, { error: "Password must be minimum 8 character." }),
    confirmPassword: z.string(),
    role: z.enum(["SENDER", "RECEIVER"], { error: "Select Role." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password not matched.",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.email({ error: "Invalid email address." }),
  password: z.string().min(6, { error: "Password too short" }),
});

export const createParcelSchema = z.object({
  receiver: z.string({ error: "Receiver is required." }).min(1,{error:"Receiver is required."}),
  details: z.string({ error: "Details are required." }).min(1,{error:"Details are required."}),
  type: z.string({ error: "Type is required." }).min(1,{error:"Type is required."}),
  weight: z.string({ error: "Weight is required." }).min(1,{error:"Weight is required."}),
  fee: z.string(),
  pickupAddress: z.string({ error: "Pickup address is required." }).min(1,{error:"Pickup address is required"}),
  deliveryAddress: z.string({ error: "Delivery address is required." }).min(1,{error:"Delivery address is required"}),
  deliveryDate: z.date({ error: "Delivery date is required." }).min(1,{error:"Delivery date is required"}),
});

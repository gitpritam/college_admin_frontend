import { z } from "zod";

export const addressValidationSchema = z.object({
  address: z
    .string()
    .min(2, "address should be at least 2 characters")
    .max(100, "address should be at most 100 characters"),
  district: z
    .string()
    .min(2, "district should be at least 2 characters")
    .max(50, "district should be at most 50 characters"),
  state: z.string()
  .min(2, "State should be at least 2 characters")
  .max(50, "State should be at most 50 characters"),
  pincode: z.string()
  .regex(/^\d{6}$/, "Pincode should be exactly 6 digits"),
  country: z.string()
  .min(2, "Country should be at least 2 characters")
  .max(50, "Country should be at most 50 characters"),
});

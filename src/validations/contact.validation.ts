import z from "zod";

export const contactValidationSchema = z.object({
  address: z
    .string()
    .min(5, "Address should be at least 5 characters")
    .max(100, "Address should be at most 100 characters"),
  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format",
    ),
  phone_number: z
    .string()
    .min(10, "Phone number should be at least 10 characters")
    .max(15, "Phone number should be at most 15 characters"),

  facebook_link: z.string().url("Invalid URL format").optional().or(z.literal("")),
  twitter_link: z.string().url("Invalid URL format").optional().or(z.literal("")),
  linkedin_link: z.string().url("Invalid URL format").optional().or(z.literal("")),
  instagram_link: z.string().url("Invalid URL format").optional().or(z.literal("")),
});
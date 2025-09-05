import z from "zod";

export const facultyValidationSchema = z.object({
  faculty_id: z.string().optional(),

  first_name: z
    .string()
    .min(2, "Title should be at least 2 characters")
    .max(50, "Title should be at most 50 characters"),

 middle_name: z
    .string()
    .min(2, "Description should be at least 2 characters")
    .max(200, "Description should be at most 200 characters"),

 last_name: z
    .string()
    .min(2, "Description should be at least 2 characters")
    .max(200, "Description should be at most 200 characters"),

  dob: z
     .string().regex(
     /^\d{4}-\d{2}-\d{2}$/,
     "start_date must be in YYYY-MM-DD format"
   ),
 phone_number: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),

  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    ),
 qualification: z
    .string()
    .min(2, "Title should be at least 2 characters")
    .max(50, "Title should be at most 50 characters"),

  designation: z
    .string()
    .min(2, "Title should be at least 2 characters")
    .max(50, "Title should be at most 50 characters"),

  department: z
    .string()
    .min(2, "Title should be at least 2 characters")
    .max(50, "Title should be at most 50 characters"),

  experience: z
    .string()
    .min(2, "Title should be at least 2 characters")
    .max(50, "Title should be at most 50 characters"),

   password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
      "Password must contain at least one uppercase letter, one number, and one special character"
    )
    .optional(),

  joining_date: z.string().regex(
    /^\d{4}-\d{2}-\d{2}$/,
    "Joining date must be in YYYY-MM-DD format"
  ),

  posted_by: z
      .string()
      .min(2, "It should be at least 2 characters")
      .max(20, "It should be at most 20 characters")
      .optional(),
});

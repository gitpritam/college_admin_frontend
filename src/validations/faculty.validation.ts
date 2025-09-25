import z from "zod";

export const facultyValidationSchema = z.object({
  faculty_id: z.string().optional(),

  first_name: z
    .string()
    .min(2, "First name should be at least 2 characters")
    .max(50, "First name should be at most 50 characters"),

  middle_name: z
    .string()
    .max(50, "Middle name should be at most 50 characters")
    .optional(),

  last_name: z
    .string()
    .min(2, "Last name should be at least 2 characters")
    .max(50, "Last name should be at most 50 characters"),

  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "DOB is madatory"),

  phone_number: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),

  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format",
    ),

  qualification: z
    .string()
    .min(2, "Qualification should be at least 2 characters")
    .max(50, "Qualification should be at most 50 characters"),

  designation: z
    .string()
    .min(2, "Designation should be at least 2 characters")
    .max(50, "Designation should be at most 50 characters"),

  department: z
    .string()
    .min(2, "Department should be at least 2 characters")
    .max(50, "Department should be at most 50 characters"),

  experience: z
    .string()
    .min(1, "Experience should be at least 1 character")
    .max(50, "Experience should be at most 50 characters"),

  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
      "Password must contain at least one uppercase letter, one number, and one special character",
    )
    .optional(),

  joining_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Joining date is mandatory"),

  posted_by: z
    .string()
    .min(2, "Posted by should be at least 2 characters")
    .max(20, "Posted by should be at most 20 characters")
    .optional(),
  role: z.enum(["admin", "staff", "faculty", "guest"]).optional(),
});

export const profilePhotoValidationSchema = z.object({
  profile_photo: z
    .any()
    .optional()
    .refine((file) => file instanceof File, "Profile photo is required")
    .refine(
      (file) => file && file.size <= 0.5 * 1024 * 1024, // 500kB limit
      "Profile photo must be less than 500KB",
    )
    .refine(
      (file) => file && ["image/jpeg", "image/jpg"].includes(file.type),
      "Profile photo must be a JPEG, JPG image",
    ),
});

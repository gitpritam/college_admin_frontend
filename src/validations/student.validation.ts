import z from "zod";

export const studentValidationSchema = z.object({
  student_id: z.string().optional(),

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

  registration_no: z
    .string()
    .min(2, "Registration number should be at least 2 characters")
    .max(20, "Registration number should be at most 20 characters")
    .optional(),

  roll_no: z
    .string()
    .min(2, "Roll number should be at least 2 characters")
    .max(20, "Roll number should be at most 20 characters")
    .optional(),

  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "DOB is madatory"),

  phone_number: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),

  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    ),

  guardian_name: z
    .string()
    .min(2, "Guardian name should be at least 2 characters")
    .max(50, "Guardian name should be at most 50 characters"),

  guardian_phone_number: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),

  guardian_email: z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    )
    .optional(),

  department: z
    .string()
    .min(2, "Department should be at least 2 characters")
    .max(50, "Department should be at most 50 characters"),

  posted_by: z
    .string()
    .min(2, "Posted by should be at least 2 characters")
    .max(20, "Posted by should be at most 20 characters")
    .optional(),

  year_of_admission: z.coerce.number({
    message: "Year of admission must be a valid",
  }),
  year_of_passing: z.coerce
    .number({ message: "Year of passing must be a valid" })
    .optional(),
});
export const passportPhotoValidationSchema = z.object({
  passport_photo: z
    .any()
    .optional()
    .refine((file) => {console.log(typeof file);return file instanceof File}, "Passport photo is required")
    .refine(
      (file) => file && file.size <= 0.5 * 1024 * 1024,
      "Passport photo must be less than 500KB"
    )
    .refine(
      (file) => file && ["image/jpeg", "image/jpg"].includes(file.type),
      "Passport photo must be a JPEG, JPG image"
    ),
});

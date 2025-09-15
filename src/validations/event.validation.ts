import z from "zod";

export const eventValidationSchema = z.object({
  event_id: z.string().optional(),

  title: z
    .string()
    .min(2, "Title should be at least 2 characters")
    .max(50, "Title should be at most 50 characters"),

  description: z
    .string()
    .min(2, "Description should be at least 2 characters")
    .max(200, "Description should be at most 200 characters"),

   start_date: z
    .string().regex(
    /^\d{4}-\d{2}-\d{2}$/,
    "start_date is madatory"
  ),

  end_date: z
    .string().regex(
    /^\d{4}-\d{2}-\d{2}$/,
    "end date is mandatory"
  ),

  start_time:z
  .string(),

  end_time:z
  .string().optional(),

  venue: z
    .string()
    .min(2, "venue should be at least 2 characters")
    .max(200, "venue should be at most 200 characters"),

  posted_by: z
    .string()
    .min(2, "It should be at least 2 characters")
    .max(20, "It should be at most 20 characters")
    .optional(),
});

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
    "Start_date is madatory"
  ),

  end_date: z
    .string().regex(
    /^\d{4}-\d{2}-\d{2}$/,
    "End date is mandatory"
  ),

  start_time:z
  .string()
  .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)"),

  end_time:z
  .string()
  .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)")
  .optional(),

  venue: z
    .string()
    .min(2, "Venue should be at least 2 characters")
    .max(200, "Venue should be at most 200 characters"),

  posted_by: z
    .string()
    .min(2, "It should be at least 2 characters")
    .max(20, "It should be at most 20 characters")
    .optional(),
}).refine((data)=>{
  console.log(new Date(data.end_date), new Date(data.start_date));
  return new Date(data.end_date) >= new Date(data.start_date);
},{
      message: "End date must be same or greater than start date",
      path: ["end_date"], // attach error to end_date field
});

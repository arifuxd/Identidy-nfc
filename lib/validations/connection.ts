import { z } from "zod";

export const connectionRequestSchema = z.object({
  slug: z.string().trim().min(1).max(80),
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(5).max(40),
  email: z
    .preprocess(
      (value) => {
        if (typeof value !== "string") {
          return value;
        }

        const trimmed = value.trim();
        return trimmed.length ? trimmed : null;
      },
      z.email().max(160).nullable().optional(),
    )
    .optional(),
});

export type ConnectionRequestInput = z.input<typeof connectionRequestSchema>;
export type ConnectionRequestValues = z.output<typeof connectionRequestSchema>;

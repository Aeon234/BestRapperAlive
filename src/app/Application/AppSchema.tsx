import { z } from "zod";

export const AppSchema = z
  .object({
    playerName: z.string().min(2, "You must enter a player name!").max(20),
    role1: z.string().min(2, "Select a Role!").max(20),
    class1: z.string().min(2, "Select a Class!").max(20),
    spec1: z.string().min(2, "Select a Spec!").max(100),
    role2: z.string().max(20).optional(),
    class2: z.string().max(20).optional(),
    spec2: z.string().max(100).optional(),
    salesInterest: z.boolean().default(false).optional(),
    salesComments: z.string().max(1000).optional(),
    meleeOfficer: z.boolean().default(false).optional(),
    rangedOfficer: z.boolean().default(false).optional(),
    logsOfficer: z.boolean().default(false).optional(),
    recruitOfficer: z.boolean().default(false).optional(),
    salesOfficer: z.boolean().default(false).optional(),
    eventsOfficer: z.boolean().default(false).optional(),
    officerComments: z.string().max(1000).optional(),
    comments: z.string().max(1000).optional(),
    timezone: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.role2 && data.role2.trim().length > 0) {
      if (!data.class2 || data.class2.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 2,
          type: "string",
          inclusive: true,
          path: ["class2"],
          message: "Select a Class!",
        });
      }
      if (!data.spec2 || data.spec2.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 2,
          type: "string",
          inclusive: true,
          path: ["spec2"],
          message: "Select a Spec!",
        });
      }
    }
  });

export type AppFormSchema = z.infer<typeof AppSchema>;

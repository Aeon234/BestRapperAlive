import { z } from "zod";

export const AppSchema = z.object({
  playerName: z.string().min(2, "You must enter a player name!").max(20),
  role1: z.string().min(2, "Select a Role!").max(20),
  class1: z.string().min(2, "Select a Class!").max(20),
  spec1: z.string().min(2, "Select a Spec!").max(100),
  role2: z.string().min(2).max(20).optional(),
  class2: z.string().min(2).max(20).optional(),
  spec2: z.string().min(2).max(100).optional(),
  salesInterest: z.boolean().optional(),
  salesComments: z.string().min(2).max(1000).optional(),
  meleeOfficer: z.boolean().optional(),
  rangedOfficer: z.boolean().optional(),
  logsOfficer: z.boolean().optional(),
  recruitOfficer: z.boolean().optional(),
  salesOfficer: z.boolean().optional(),
  eventsOfficer: z.boolean().optional(),
  officerComments: z.string().min(2).max(1000).optional(),
  comments: z.string().min(2).max(1000).optional(),
  timezone: z.string().optional(),
});

export type AppFormSchema = z.infer<typeof AppSchema>;

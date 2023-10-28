import { z } from "zod";

export const IssueSchema = z.object({
  title: z.string().min(1, "Must have at least 1 character").max(100),
  description: z.string().min(1, "Must have at least 1 character").max(1000),
});

export type Issue = z.infer<typeof IssueSchema>;

import { z } from "zod";

export const IssueSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(1000),
});

export type Issue = z.infer<typeof IssueSchema>;

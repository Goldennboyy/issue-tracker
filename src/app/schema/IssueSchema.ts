import { Status } from "@prisma/client";
import { z } from "zod";

export const IssueCreateSchema = z.object({
  title: z.string().min(1, "Must have at least 1 character").max(100),
  description: z.string().min(1, "Must have at least 1 character").max(1000),
});

export type Issue = z.infer<typeof IssueCreateSchema>;

export const ModifyIssueSchema = z.object({
  title: z.string().min(1, "Must have at least 1 character").max(100),
  description: z.string().min(1, "Must have at least 1 character").max(1000),
  status: z.enum([Status.OPEN, Status.CLOSED, Status.IN_PROGRESS]),
});

export type ModifyIssue = z.infer<typeof ModifyIssueSchema>;

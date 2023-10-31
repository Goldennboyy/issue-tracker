import { create } from "zustand";
import { type Status } from "@prisma/client";

type Issue = {
  id: string;
  title: string;
  description: string;
  status: Status;
};

interface IssueState {
  issue: Issue | null | undefined;
  setIssue: (newIssue: Issue) => void;
}

const useIssueStore = create<IssueState>((set) => ({
  issue: undefined,
  setIssue: (newIssue: Issue) => set({ issue: newIssue }),
}));

export { useIssueStore };

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/trpc/react";
import { type Status } from "@prisma/client";
import React from "react";

type issueCardProps = {
  title: string;
  status: Status;
  description: string;
};

export const IssueList = () => {
  const { data: issues } = api.issue.getIssues.useQuery();
  return (
    <>
      {issues?.map((issue) => (
        <IssueCard
          key={issue.id}
          title={issue.title}
          status={issue.status}
          description={issue.description}
        />
      ))}
    </>
  );
};

const IssueCard = ({ title, status, description }: issueCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

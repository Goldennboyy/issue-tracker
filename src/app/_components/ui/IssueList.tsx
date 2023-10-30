import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { type Status } from "@prisma/client";
import { PencilIcon, XCircleIcon } from "lucide-react";
import React from "react";
import BadgeStatus from "./BadgeStatus";
import { useToast } from "@/components/ui/use-toast";

type issueCardProps = {
  id: string;
  title: string;
  status: Status;
  description: string;
};

export const IssueList = () => {
  const { data: issues } = api.issue.getIssues.useQuery();
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 ">
      {issues?.map((issue) => (
        <IssueCard
          key={issue.id}
          id={issue.id}
          title={issue.title}
          status={issue.status}
          description={issue.description}
        />
      ))}
    </div>
  );
};

const IssueCard = ({ title, status, description, id }: issueCardProps) => {
  const { toast } = useToast();
  const trpc = api.useUtils();
  const deleteIssue = api.issue.deleteIssue.useMutation({
    onSettled: async () => {
      // invalidate query -> basically remove the cache
      await trpc.issue.getIssues.invalidate();
    },
  });

  const onDelete = () => {
    toast({
      title: "Success",
      variant: "default",
      description: "Your issue has been deleted successfully",
    });
    deleteIssue.mutate({ id: id });
  };

  return (
    <Card>
      <CardHeader>
        <div className="relative flex justify-start break-all ">
          <CardTitle>{title}</CardTitle>
          <div className="absolute right-0 flex space-x-2">
            <PencilIcon className="cursor-pointer fill-yellow-500 " />
            <XCircleIcon
              onClick={() => onDelete()}
              className="cursor-pointer fill-red-500"
            />
          </div>
        </div>
        <CardDescription className={cn("text-sm font-semibold")}>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BadgeStatus status={status} />
      </CardContent>
    </Card>
  );
};

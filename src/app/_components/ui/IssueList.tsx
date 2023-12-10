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
import React, { useState } from "react";
import BadgeStatus from "./BadgeStatus";
import { useToast } from "@/components/ui/use-toast";
import ModifyIssueSheet from "./ModifyIssueSheet";
import Loading from "./Loading";
import { useIssueStore } from "@/app/store/store";

type issueCardProps = {
  id: string;
  title: string;
  status: Status;
  description: string;
};

export const IssueList = () => {
  const { data: issues, isLoading } = api.issue.getIssues.useQuery();
  if (isLoading) return <Loading />;
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

  const { issue, setIssue } = useIssueStore();

  // state to handle the modal sheet
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => setOpen(open);

  // select a card item issue (useful for the modify issue cuz i won't have to use a router)
  const selectIssue = () => {
    setIssue({
      id,
      title,
      status,
      description,
    });

    console.log(issue);
  };

  return (
    <Card onClick={() => selectIssue()} className={cn("max-w-lg w-full")}>
      <CardHeader>
        <div className="relative flex justify-start leading-3 break-all ">
          <CardTitle>{title}</CardTitle>
          <div className="flex justify-end flex-1 space-x-2">
            <PencilIcon
              className="cursor-pointer fill-yellow-500"
              onClick={() => setOpen(true)}
            />
            <ModifyIssueSheet open={open} onOpenChange={handleOpenChange} />
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

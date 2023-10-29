import { formatWord } from "@/app/utils/helpers";
import { Badge } from "@/components/ui/badge";
import { type Status } from "@prisma/client";
import React from "react";
import { cn } from "@/lib/utils";

type badgeProps = {
  status: Status;
};

const BadgeStatus = ({ status }: badgeProps) => {
  const badgeColor = () => {
    switch (status) {
      case "OPEN":
        return "h-8 w-fit bg-blue-500/50 rounded-full";
      case "IN_PROGRESS":
        return "h-8 w-fit bg-indigo-500 rounded-full";
      case "CLOSED":
        return "h-8 w-fit bg-green-400 rounded-full";
    }
  };

  return (
    <Badge variant={"outline"} className={cn(badgeColor())}>
      {formatWord(status.toString())}
    </Badge>
  );
};

export default BadgeStatus;

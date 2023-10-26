import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const IssuePage = () => {
  return (
    <div>
      <Button>
        <Link href={"/issues/new"}>
          <div className="flex gap-2">
            <PlusCircleIcon size={20} />
            New Issue
          </div>
        </Link>
      </Button>
    </div>
  );
};

export default IssuePage;

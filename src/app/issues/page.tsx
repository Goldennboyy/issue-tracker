"use client";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { IssueList } from "../_components/ui/IssueList";

const IssuePage = () => {
  return (
    <div className="flex flex-col w-full ">
      <Link href={"/issues/new"}>
        <Button>
          <div className="flex gap-2">
            <PlusCircleIcon size={20} />
            New Issue
          </div>
        </Button>
      </Link>
      <div className="py-5">
        <h1 className="text-2xl font-semibold">Latest Issue</h1>
      </div>
      <div className="items-center mx-auto">
        <IssueList />
      </div>
    </div>
  );
};

export default IssuePage;

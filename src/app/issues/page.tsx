"use client";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { IssueList } from "../components/ui/IssueList";

const IssuePage = () => {
  return (
    <div className="flex max-w-7xl flex-col">
      <Link href={"/issues/new"}>
        <Button>
          <div className="flex gap-2">
            <PlusCircleIcon size={20} />
            New Issue
          </div>
        </Button>
      </Link>
      <div className="py-10">
        <h1 className="text-2xl font-semibold">Latest Issue</h1>
      </div>
      <IssueList />
    </div>
  );
};

export default IssuePage;

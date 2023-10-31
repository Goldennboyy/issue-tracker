import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import React from "react";
import ModifyIssueForm from "./Form/ModifyIssueForm";

interface ModifyIssueSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ModifyIssueSheet = ({ open, onOpenChange }: ModifyIssueSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Modify the issue</SheetTitle>
        </SheetHeader>
        <ModifyIssueForm onOpenChange={onOpenChange} />
      </SheetContent>
    </Sheet>
  );
};

export default ModifyIssueSheet;

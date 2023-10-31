import { ModifyIssue, ModifyIssueSchema } from "@/app/schema/IssueSchema";
import { useIssueStore } from "@/app/store/store";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Status } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";

interface ModifyIssueProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ModifyIssue = ({ open, onOpenChange }: ModifyIssueProps) => {
  const form = useForm<ModifyIssue>({
    resolver: zodResolver(ModifyIssueSchema),
    defaultValues: {
      title: "",
      status: Status.OPEN,
      description: "",
    },
  });

  const { toast } = useToast();

  const modifyIssue = api.issue.updateIssue.useMutation({
    onSuccess: () => {
      toast({
        title: "Success",
        variant: "default",
        description: "Your issue has been created",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        variant: "destructive",
        description: `Error : ${error.message}`,
      });
    },
  });

  // get the Issue from the global store from a selected card
  const { issue } = useIssueStore();

  if (!issue) return;

  console.log("issue", issue);

  const modifySubmit = (values: ModifyIssue) => {
    const res = ModifyIssueSchema.safeParse(values);
    if (res.success) {
      console.log({ values });
      modifyIssue.mutate({
        id: issue.id,
        title: values.title,
        description: values.description,
        status: values.status,
      });
    }

    form.reset();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Modify the issue</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(form.getValues(), issue.id);
              form.handleSubmit(modifySubmit);
            }}
            className="flex flex-col space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                console.log(field),
                (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                console.log(field),
                (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                console.log(field),
                (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={(status) => field.onChange(status)}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {Object.keys(Status).map((status) => (
                          <SelectItem key={status} value={status as Status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )
              )}
            />
            <Button
              onClick={form.handleSubmit(modifySubmit)}
              variant={"default"}
              type="submit"
            >
              Modify
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default ModifyIssue;

"use client";
import { type Issue, IssueSchema } from "@/app/schema/IssueSchema";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React from "react";
import { useForm } from "react-hook-form";
import { api } from "@/trpc/react";
import { useToast } from "@/components/ui/use-toast";

const NewIssue = () => {
  const form = useForm<Issue>({
    resolver: zodResolver(IssueSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { toast } = useToast();

  const createIssue = api.issue.createIssue.useMutation({
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

  const onSubmit = (values: Issue) => {
    console.log(values);
    createIssue.mutate({ ...values });
    form.reset();
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mx-auto mt-44 max-w-xl space-y-6"
    >
      <div>
        <label htmlFor="title">Title</label>
        <Input
          {...form.register("title")}
          type="text"
          placeholder="Enter the title"
        />
        {form.formState.errors.title && (
          <span className="text-red-500">
            {form.formState.errors.title.message}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="descriprion">Description</label>
        <Textarea
          {...form.register("description")}
          placeholder="Enter the description of the issue"
        />
        {form.formState.errors.description && (
          <span className="text-red-500">
            {form.formState.errors.description.message}
          </span>
        )}
      </div>

      <Button
        variant={"default"}
        className={cn("bg-blue-400 hover:bg-blue-500")}
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
};

export default NewIssue;

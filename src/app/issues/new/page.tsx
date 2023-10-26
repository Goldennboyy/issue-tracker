"use client";
import { type Issue, IssueSchema } from "@/app/schema/IssueSchema";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
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
    onError: () => {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Your issue has been created",
      });
    },
  });

  const onSubmit = (values: Issue) => {
    createIssue.mutate({ ...values });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto mt-44 max-w-xl space-y-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter a title" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter the description of the issue"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button variant={"default"} className={cn("bg-blue-500")} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default NewIssue;

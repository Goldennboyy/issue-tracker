import { type ModifyIssue, ModifyIssueSchema } from "@/app/schema/IssueSchema";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Status } from "@prisma/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

interface ModifyIssueFormProps {
  onOpenChange: (open: boolean) => void;
}

const ModifyIssueForm = ({ onOpenChange }: ModifyIssueFormProps) => {
  const form = useForm<ModifyIssue>({
    resolver: zodResolver(ModifyIssueSchema),
  });

  const { toast } = useToast();

  const trpc = api.useUtils();

  const modifyIssue = api.issue.updateIssue.useMutation({
    onSuccess: () => {
      toast({
        title: "Success",
        variant: "default",
        description: "Your issue has been modified",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        variant: "destructive",
        description: `Error : ${error.message}`,
      });
    },

    onSettled: async () => {
      // invalidate the cache
      await trpc.issue.getIssues.invalidate();
      await trpc.issue.countIssueStatus.invalidate()
    },
  });

  // get the Issue from the global store from a selected card
  const { issue } = useIssueStore();



  console.log("issue", { issue });

  useEffect(() => {
    if (!issue) return
    form.setValue("title", issue.title);
    form.setValue("description", issue.description);
    form.setValue("status", issue.status);
  }, [form, issue])

  const modifySubmit = (values: ModifyIssue) => {
    const res = ModifyIssueSchema.safeParse(values);
    if (res.success) {
      console.log({ values });
      modifyIssue.mutate({
        id: issue?.id ?? "",
        title: values.title,
        description: values.description,
        status: values.status,
      });
    }

    form.reset(); // clear the form
    onOpenChange(false); // make sure the modal sheet is closed
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(form.getValues(), issue?.id);
          form.handleSubmit(modifySubmit);
        }}
        className="flex flex-col space-y-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
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
  );
};

export default ModifyIssueForm;

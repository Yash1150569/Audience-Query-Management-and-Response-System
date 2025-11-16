'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createQueryAction } from "@/app/actions";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";

const formSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters."),
  customerEmail: z.string().email("Please enter a valid email."),
  source: z.enum(['Email', 'Twitter', 'Chat', 'Facebook']),
  content: z.string().min(10, "Query content must be at least 10 characters.").max(500, "Query content is too long."),
});

type NewQueryFormProps = {
  setOpen: (open: boolean) => void;
};

export function NewQueryForm({ setOpen }: NewQueryFormProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      source: "Email",
      content: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const result = await createQueryAction(values);
      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        });
        setOpen(false);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.message,
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Customer Name</FormLabel>
                <FormControl>
                    <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="customerEmail"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Customer Email</FormLabel>
                <FormControl>
                    <Input placeholder="john.doe@example.com" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Source</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a source" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Email">Email</SelectItem>
                  <SelectItem value="Twitter">Twitter</SelectItem>
                  <SelectItem value="Chat">Chat</SelectItem>
                  <SelectItem value="Facebook">Facebook</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Query Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Type the customer's message here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending && <Loader2 className="animate-spin" />}
          {isPending ? "Analyzing & Creating..." : "Create Query"}
        </Button>
      </form>
    </Form>
  );
}

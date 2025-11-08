import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { createDepartmentZodSchema } from "@/validations/department.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const DepartmentForm = () => {
  const form = useForm<z.infer<typeof createDepartmentZodSchema>>({
    resolver: zodResolver(createDepartmentZodSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "ACTIVE",
    },
  });

  const onSubmit = (values: z.infer<typeof createDepartmentZodSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form className="p-6 border rounded-lg bg-white space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Human Resources" {...field} />
              </FormControl>
              <FormDescription className="sr-only">
                Department name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription className="sr-only">
                Department description
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select {...field}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription className="sr-only">
                Department status
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-wrap gap-3">
          <Button className="bg-green-600 hover:bg-green-500 cursor-pointer">
            Add
          </Button>
          <Button
            type="button"
            className="bg-gray-700 hover:bg-gray-600 cursor-pointer"
          >
            Update
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="cursor-pointer"
          >
            Delete
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DepartmentForm;

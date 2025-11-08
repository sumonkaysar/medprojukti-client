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
import type { IDepartment } from "@/types/department.type";
import { createDepartmentZodSchema } from "@/validations/department.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const DepartmentForm = ({
  manageDept,
}: {
  manageDept: {
    selectedDept: IDepartment | null;
    action: "delete" | "edit" | null;
  };
}) => {
  const currentDept = manageDept.action ? manageDept.selectedDept : null;
  const form = useForm<z.infer<typeof createDepartmentZodSchema>>({
    resolver: zodResolver(createDepartmentZodSchema),
    values: {
      name: currentDept?.name || "",
      description: currentDept?.description || "",
      status: currentDept?.status || "ACTIVE",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof createDepartmentZodSchema>
  ) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!result.success) {
        toast.error(`Login failed: ${result.message}`, { id: toastId });
        console.log("Login failed:", result.message);
        return;
      }

      toast.success("Login successful", { id: toastId });
      console.log("Login successful");
    } catch (error) {
      toast.error("Login failed", { id: toastId });
      console.error("Login failed:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-6 border rounded-lg bg-white space-y-4"
      >
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
          <Button
            disabled={!!manageDept.action}
            className="bg-green-600 hover:bg-green-500 cursor-pointer"
          >
            Add
          </Button>
          <Button
            disabled={manageDept.action !== "edit"}
            className="bg-gray-700 hover:bg-gray-600 cursor-pointer"
          >
            Update
          </Button>
          <Button
            disabled={manageDept.action !== "delete"}
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

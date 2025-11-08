import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginZodSchema } from "@/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Earth, Info, ShieldIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";
import z from "zod";

const LoginForm = () => {
  const [isAgreed, setIsAgreed] = useState(false);
  const form = useForm<z.infer<typeof loginZodSchema>>({
    resolver: zodResolver(loginZodSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginZodSchema>) => {
    const toastId = toast.loading("Logging in...");
    try {
      const { username, password } = values;
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
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
    <div className="flex flex-col min-h-screen">
      <div className="mb-8 mt-12">
        <div className="flex items-center">
          <div className="text-[#424242] text-5xl font-bold flex items-center mx-auto">
            <Link to="/" className="inline-flex items-center">
              <span className="text-[#8cc63f]">
                <ShieldIcon className="h-12 w-12" />
              </span>
              <span>ZK</span>
              <span className="text-[#8cc63f]">Bio</span>
            </Link>
            <span className="ml-2">Time</span>
          </div>
        </div>
      </div>
      <div className="py-20 flex flex-col items-center pt-10 bg-[#8cc63f] ">
        <div className="max-w-lg ">
          <div className="mb-6 flex justify-between">
            <div className="flex">
              <span className="text-white">Admin Login</span>
              <span className="mx-2">|</span>
              <span>Self-Service</span>
            </div>
            <div className="ml-10 flex items-center space-x-2">
              <Info className="h-5 w-5" />
              <Earth className="h-5 w-5" />
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="username"
                        className="h-12 bg-white rounded-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Enter your username.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        className="h-12 bg-white rounded-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Enter your password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex ">
                <Checkbox
                  checked={isAgreed}
                  onClick={() => setIsAgreed(!isAgreed)}
                  id="terms"
                  className="mt-1 bg-white"
                />
                <label htmlFor="terms" className="ml-2 text-sm">
                  I agree to the{" "}
                  <span className="text-white">
                    Personal Information Protection and Privacy Policy
                  </span>{" "}
                  &{" "}
                  <span className="text-white">Data Processing Agreement</span>
                </label>
              </div>
              <Button
                disabled={!isAgreed}
                className="h-12 w-full rounded-none italic text-lg mt-2 bg-[#444A4A]"
              >
                Login
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="py-6 flex flex-col items-center">
        <div className="mb-2">
          <div className="text-[#424242] font-bold flex items-center">
            <span className="inline-flex items-center italic text-5xl">
              <span>ZK</span>
              <span className="text-[#8cc63f]">T</span>
              <span className="text-[#8cc63f]">eco</span>
            </span>
          </div>
        </div>
        <div className="text-xs text-[#424242]">
          Copyright ©2025 ZKTECO CO.,LTD All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

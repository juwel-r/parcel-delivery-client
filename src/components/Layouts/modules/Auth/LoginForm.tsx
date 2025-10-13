import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Password from "@/components/ui/PasswordField";
import { loginSchema } from "@/utils/zodSchema";
import { useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router";
import { authApi, useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hook";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const credential = {
      email: data.email,
      password: data.password,
    };

    try {
      const result = await login(credential).unwrap();
      toast.success(result.message);

      dispatch(authApi.util.invalidateTags(["USER"]));

      navigate(location.state || "/");
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message || error.data);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your Credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 flex flex-col"
            >
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john.doe@email.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your public display email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Password {...field} />
                      {/* here i used another password field from origin ui to show/hide password, must need to pass props */}
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-1/3 mx-auto">
                Login
              </Button>
              <FormDescription className="">
                Don&apos;t have an account?{" "}
                <Link className="underline" to="/registration">
                  Registration
                </Link>
              </FormDescription>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

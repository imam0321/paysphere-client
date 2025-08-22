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
import Password from "@/components/ui/Password";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

export default function RegisterForm({ userType }:{userType: string}) {
  // const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onsubmit = async (data) => {
    console.log(data, {role: userType});
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your Name"
                  className="w-full"
                  {...field}
                  required
                />
              </FormControl>
              <FormDescription className="sr-only">
                This is your Name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your Email"
                  className="w-full"
                  {...field}
                  required
                />
              </FormControl>
              <FormDescription className="sr-only">
                This is your Email
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Password {...field} />
              </FormControl>
              <FormDescription className="sr-only">
                This is your Password
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Password {...field} />
              </FormControl>
              <FormDescription className="sr-only">
                This is your Confirm Password
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full rounded-xl mt-2">
          Registration
        </Button>
        <p className="text-center text-sm mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium">
            Login
          </Link>
        </p>
      </form>
    </Form>
  );
}

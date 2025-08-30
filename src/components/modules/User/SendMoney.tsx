/* eslint-disable @typescript-eslint/no-explicit-any */
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useGetAllUserQuery } from "@/redux/features/user/user";
import SearchPhone from "@/components/SearchPhone";
import { useSendMoneyMutation } from "@/redux/features/wallet/wallet";

export default function SendMoney() {
  const [open, setOpen] = useState(false);

  const { data: usersData } = useGetAllUserQuery({
    fields: "phone,walletId",
  });

  const [sendMoney] = useSendMoneyMutation();

  const users = usersData?.data.map((item: any) => ({
    phone: item.phone,
    walletId: item.walletId,
  }));

  const form = useForm({
    defaultValues: {
      walletId: "",
      amount: 0,
    },
});

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const sendData = {
      ...data,
      amount: Number(data.amount),
    };

    const toastId = toast.loading("Sending money...");

    try {
      await sendMoney(sendData).unwrap();
      toast.success("Money sent successfully!", { id: toastId });
      setOpen(false);
      form.reset({walletId: "", amount: 0})
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", { id: toastId });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="rounded-2xl justify-start gap-2 w-full"
        >
          <Send className="h-4 w-4" />
          Send Money
        </Button>
      </DialogTrigger>

      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="sm:max-w-[425px]"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Send Money</DialogTitle>
              <DialogDescription>
                Enter user phone number & amount to send money.
              </DialogDescription>
            </DialogHeader>

            {/* Phone number search field */}
            <FormField
              control={form.control}
              name="walletId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <SearchPhone field={field} users={users || []} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Amount input */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      {...field}
                      min={10}
                      value={field.value as number}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Send</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

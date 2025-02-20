"use client";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdEmail } from "react-icons/md";
import { loginSchema, loginSchemaType } from "./lib";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { loginAction } from "../_actions";
import { toast } from "sonner";
import { PasswordInput } from "@/components/ui/password-input";
import { RiLockPasswordFill } from "react-icons/ri";
import LoadingButton from "@/components/ui/loadingButton";
import { login } from "@/lib/utils/cookies";

export default function AuthForm() {
  const [pendding, startTransition] = useTransition();
  const form = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: loginSchemaType) {
    startTransition(async () => {
      const res = await loginAction(values);

      if (res?.success && res.data) {
        toast.success(res.message);
        const token = res.data.token;
        const redirect = res.data.redirect;
        login(token, redirect);
      } else {
        toast.error(res?.message?.toString(), {
          cancel: {
            label: "Close",
            onClick: () => toast.dismiss(),
          },
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form
        dir="rtl"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 md:space-y-8 font-sirwan_meduim"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ئیمەیڵ</FormLabel>
              <FormControl>
                <Input
                  Icon={MdEmail}
                  className="font-sirwan_reguler"
                  placeholder="ئیمەیڵ"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>پاسۆرد</FormLabel>
              <FormControl>
                <PasswordInput
                  Icon={RiLockPasswordFill}
                  className="font-sirwan_reguler"
                  placeholder="پاسۆرد"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          loading={pendding}
          type="submit"
          className="w-full font-sirwan tracking-[1px] "
          size="lg"
        >
          چوونەژوورەوە
        </LoadingButton>
      </form>
    </Form>
  );
}

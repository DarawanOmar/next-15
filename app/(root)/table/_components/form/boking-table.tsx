"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { LuLoaderCircle } from "react-icons/lu";
import { SelectFormField } from "@/components/reusable/reusable-select";
import { bookingTableType, bookingTable } from "../../_type";
import { addTableAction, updateTableAction } from "../../_actions";
import { toast } from "sonner";

type filmFormProps = {
  isEdit?: boolean;
  info?: bookingTableType;
  handleClose?: () => void;
  id?: number;
};

export default function BookingTableForm({
  isEdit,
  info,
  handleClose,
  id,
}: filmFormProps) {
  const [pendding, setPendding] = useTransition();
  const form = useForm<bookingTableType>({
    resolver: zodResolver(bookingTable),
    defaultValues: {
      date: new Date(),
      time: "",
    },
  });

  function onSubmit(values: bookingTableType) {
    setPendding(async () => {
      // const result = isEdit
      //   ? await updateTableAction(id as number, values)
      //   : await addTableAction(values);
      // if (result.success) {
      //   toast.success(result.message);
      //   handleClose && handleClose();
      // } else {
      //   toast.error(result.message);
      // }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="  px-6">
        <div className="grid grid-cols-1 gap-10">
          <FormField
            control={form.control}
            name={"time"}
            render={({ field }) => {
              return (
                <FormItem className=" w-full  max-w-full">
                  <FormLabel>کات</FormLabel>
                  <FormControl>
                    <Input {...field} isform className={cn("w-full ")} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <div className=" max-w-lg mx-auto gap-16 w-full mt-16 mb-6 flex  justify-between items-center ">
          <Button type="submit" className="w-full py-[23px]">
            {pendding ? (
              <LuLoaderCircle className="animate-spin transition-all duration-500" />
            ) : isEdit ? (
              "گۆرانکاری"
            ) : (
              "تۆمارکردن"
            )}
          </Button>
          <DialogClose asChild>
            <Button
              type="button"
              effect={"shine"}
              className="w-full py-[23px] bg-transparent border border-primary hover:text-white text-primary  transition-all duration-500"
            >
              ڕەتکردنەوە
            </Button>
          </DialogClose>
        </div>
      </form>
    </Form>
  );
}

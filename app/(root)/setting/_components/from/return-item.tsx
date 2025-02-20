"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { returnItem, returnItemType } from "../../_type";
import { TextField } from "@/components/reusable/input-form-reusable";
import { Plus } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { LuLoaderCircle } from "react-icons/lu";
import { retrunItemAction } from "../../_actions";

function ReturnItem({
  id,
  handleClose,
}: {
  id: number;
  handleClose: () => void;
}) {
  const [pending, setPending] = React.useTransition();
  const form = useForm<returnItemType>({
    resolver: zodResolver(returnItem),
    defaultValues: {
      quantity: 0,
    },
  });

  function onSubmit(values: returnItemType) {
    setPending(async () => {
      const result = await retrunItemAction(id, values);
      if (result.success) {
        toast.success(result.message);
        form.reset();
        handleClose();
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-6"
        >
          <TextField
            control={form.control}
            name="quantity"
            label="بڕ"
            classFormItem="w-full"
          />
          <Button type="submit" className=" max-w-full  rounded-full ">
            {pending ? (
              <LuLoaderCircle className="animate-spin transition-all duration-500" />
            ) : (
              "گەڕانەوە"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}

export default ReturnItem;

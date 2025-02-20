"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { foodNote, foodNoteType } from "../../_type";
import { TextField } from "@/components/reusable/input-form-reusable";
import { X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllOrderOptions } from "../../_lib";

function FoodNoteForm() {
  const { data: options, isLoading: isLoadingOptions } = useQuery({
    queryKey: ["order_options"],
    queryFn: getAllOrderOptions,
  });

  const form = useForm<foodNoteType>({
    resolver: zodResolver(foodNote),
    defaultValues: {
      note: "",
    },
  });

  function onSubmit(data: foodNoteType) {}

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-5"
        >
          <TextField
            control={form.control}
            name="note"
            label="تێبینی"
            className="max-w-full"
          />
          <Button type="submit" className="w-full  ">
            زیادکردن{" "}
          </Button>
        </form>
      </Form>
      <div className="my-10 grid grid-cols-1 gap-5">
        {options?.data?.map((option, index) => (
          <div
            className="bg-table dark:bg-black/10 dark:border rounded-full p-4 w-full relative"
            key={option.option_id}
          >
            {option.option_text}{" "}
            <button
              onClick={() => {}}
              className="absolute top-0 right-0 bg-black text-white p-0.5 rounded-full"
            >
              <X size={15} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default FoodNoteForm;

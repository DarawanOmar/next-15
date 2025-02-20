"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { typeFoodWarehouse, typeFoodWarehouseType } from "../../_type";
import { TextField } from "@/components/reusable/input-form-reusable";
import { Plus, X } from "lucide-react";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllCategory } from "../../_lib";
import { addCategoryAction, deleteCategoryItem } from "../../_actions";
import { toast } from "sonner";
import { LuLoaderCircle } from "react-icons/lu";

function AddFoodTypeWarehouse() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["category_all"],
    queryFn: getAllCategory,
  });
  console.log(data);
  const [pending, setPending] = React.useTransition();
  const [deletePending, setdeletePending] = React.useTransition();
  const form = useForm<typeFoodWarehouseType>({
    resolver: zodResolver(typeFoodWarehouse),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: typeFoodWarehouseType) {
    setPending(async () => {
      const result = await addCategoryAction(values);
      if (result.success) {
        toast.success(result.message);
        refetch();
        form.reset();
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
          className="flex items-end gap-5 px-8"
        >
          <TextField
            control={form.control}
            name="name"
            label="جۆر"
            classFormItem="w-full"
          />
          <Button type="submit" className=" max-w-full  rounded-full ">
            {pending ? (
              <LuLoaderCircle className="animate-spin transition-all duration-500" />
            ) : (
              <Plus size={25} strokeWidth={3} />
            )}
          </Button>
        </form>
      </Form>
      <div className="my-10  flex flex-col justify-center items-center">
        {isLoading ? (
          <LuLoaderCircle className="animate-spin transition-all duration-500" />
        ) : (
          <div className="flex flex-col justify-center items-center  max-w-max gap-5 ">
            {data?.data?.map((category, index) => (
              <div
                className="bg-table dark:bg-black/10 dark:border rounded-full p-4 w-full relative flex justify-center items-center"
                key={category.category_id}
              >
                {category.name_ku}
                <button
                  type="button"
                  disabled
                  onClick={() => {
                    setdeletePending(async () => {
                      deleteCategoryItem(category.category_id);
                    });
                  }}
                  className="absolute top-0 right-0 bg-black text-white p-0.5 rounded-full"
                >
                  {deletePending ? (
                    <LuLoaderCircle className="animate-spin transition-all duration-500" />
                  ) : (
                    <X size={15} />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default AddFoodTypeWarehouse;

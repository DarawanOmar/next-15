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
import { getAllCategory, getAllOrderOptions } from "../../_lib";
import {
  addCategoryAction,
  addOrderOptionAction,
  deleteCategoryItem,
  deleteOrderOptionsItem,
} from "../../_actions";
import { toast } from "sonner";
import { LuLoaderCircle } from "react-icons/lu";

function AddCategory() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["category_all"],
    queryFn: getAllCategory,
  });
  const [pending, setPending] = React.useTransition();
  const [deletePending, setdeletePending] = React.useTransition();
  const [deletingId, setDeletingId] = React.useState<number>(0);
  const form = useForm<typeFoodWarehouseType>({
    resolver: zodResolver(typeFoodWarehouse),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: typeFoodWarehouseType) {
    setPending(async () => {
      const result = await addOrderOptionAction(values);
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
                {/* <button
                  type="button"
                  onClick={() => {
                    setDeletingId(category.category_id);
                    setdeletePending(async () => {
                      const res = await deleteOrderOptionsItem(
                        category.category_id
                      );
                      if (res.success) {
                        toast.success(res.message);
                        refetch();
                        setDeletingId(0);
                      } else {
                        toast.error(res.message);
                        setDeletingId(0);
                      }
                    });
                  }}
                  className="absolute top-0 right-0 bg-black text-white p-0.5 rounded-full"
                >
                  {deletingId === category.category_id ? (
                    <LuLoaderCircle className="animate-spin transition-all duration-500" />
                  ) : (
                    <X size={15} />
                  )}
                </button> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default AddCategory;

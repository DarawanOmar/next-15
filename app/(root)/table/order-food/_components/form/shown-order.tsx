"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useTransition } from "react";
import { OneOrder, orderFood, orderFoodType } from "../../../_type";
import { SelectFormField } from "@/components/reusable/reusable-select";
import { TextField } from "@/components/reusable/input-form-reusable";
import ListOrder from "../list-order";
import { TextAreaField } from "@/components/reusable/textarea-form-reusable";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import DonedOrder from "../doned-order";
import ButtonsSubmitForm from "./buttons-form-submit";
import { toast } from "sonner";
import { orderAddForSecondTime, orderTableFood } from "../../../_actions";
import { useQuery } from "@tanstack/react-query";
import { getAllTablesWithoutFloar } from "../../../_lib";
import { calculateDiscountedPrice, cn } from "@/lib/utils";
import { useSnapshot } from "valtio";
import foodStore, { resetAll, SelectedFood } from "../../../order-food-store";
import { LuLoaderCircle } from "react-icons/lu";
import { getAllOrderOptions } from "@/app/(root)/setting/_lib";
import { getSupplierOrCustomer } from "@/app/(root)/purchase/_lib";
import { getEmployees } from "@/app/(root)/employees/_lib";
import LoadingSelectSkeleton from "@/components/layout/loading-select-skeleton";

type Props = {
  table_id?: number;
  is_order_page: boolean;
  order_list: OneOrder;
};

export default function ShownOrder({
  table_id,
  is_order_page,
  order_list,
}: Props) {
  const { selectedFood, totalPriceListOrder } = useSnapshot(foodStore);
  const { data: tables, isLoading } = useQuery({
    queryKey: ["all_tables"],
    queryFn: getAllTablesWithoutFloar,
    enabled: is_order_page,
  });
  const { data: options, isLoading: isLoadingOptions } = useQuery({
    queryKey: ["order_options"],
    queryFn: getAllOrderOptions,
  });
  const { data: customer, isLoading: parti_idLoading } = useQuery({
    queryKey: ["partie_users"],
    queryFn: () => getSupplierOrCustomer("supplier"),
  });
  const { data: employees, isLoading: employeesLoading } = useQuery({
    queryKey: ["employee_users"],
    queryFn: () => getEmployees(),
  });

  const [pendding, setPendding] = useTransition();
  const form = useForm<orderFoodType>({
    resolver: zodResolver(orderFood),
    defaultValues: {
      order_type: "",
      table_number: "",
      name: "",
      phone: "",
      options: [],
      note: "",
      discount_dinar: "",
      discount_percentage: "",
      employee_id: "",
      partie_id: "",
    },
  });

  const type = form.watch("order_type");
  const table_number = form.watch("table_number");
  function onSubmit(values: orderFoodType) {
    setPendding(async () => {
      const result =
        order_list.order_id === undefined
          ? await orderTableFood(
              is_order_page ? Number(table_number) : (table_id as number),
              values,
              selectedFood as SelectedFood[]
            )
          : await orderAddForSecondTime(
              order_list.order_id,
              {
                options: values.options,
                note: values.note as string,
              },
              selectedFood as SelectedFood[]
            );
      if (result.success) {
        toast.success(result.message);
        resetAll();
        form.reset();
      } else {
        toast.error(result.message);
      }
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-lg:max-w-full lg:max-w-[460px] max-h-max "
      >
        <div className="grid grid-cols-1 gap-5">
          <div className="flex gap-2 items-center">
            <p className="text-softGray">جۆری داواکاری : </p>
            <SelectFormField
              control={form.control}
              name="order_type"
              label={""}
              isLabel={false}
              placeholder="جۆر هەڵبژێرە"
              options={orderOptions}
              isForm
              className="w-[200px] "
            />
          </div>
          <div
            className={cn("flex gap-2 items-center", {
              hidden: !is_order_page,
            })}
          >
            <p className="text-softGray">ژمارەی مێزەکە : </p>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <SelectFormField
                control={form.control}
                isSearchQuery
                name="table_number"
                label={""}
                isLabel={false}
                placeholder="مێز هەڵبژێرە"
                options={
                  tables?.data?.map((table) => ({
                    value: table.table_id.toString(),
                    label: table.table_number.toString(),
                  })) || []
                }
                isForm
                className="w-[200px] "
              />
            )}
          </div>
          {type === "staff" &&
            (employeesLoading ? (
              <LoadingSelectSkeleton form={form.control} />
            ) : (
              <>
                <SelectFormField
                  control={form.control}
                  name="employee_id"
                  label={""}
                  isLabel={false}
                  placeholder="ستاف هەڵبژێرە"
                  className="bg-white dark:bg-black/15 dark:border max-w-[315px] ml-auto"
                  options={
                    employees?.data?.map((employee) => ({
                      value: employee.employee_id.toString(),
                      label: employee.name,
                    })) || []
                  }
                />
              </>
            ))}
          {(type === "outgo" || type === "delivery" || type === "guest") && (
            <TextField
              control={form.control}
              name="name"
              label=""
              placeholder="ناو"
              className="max-w-[315px] ml-auto"
            />
          )}
          {type === "loan" &&
            (parti_idLoading ? (
              <LoadingSelectSkeleton form={form.control} />
            ) : (
              <>
                <SelectFormField
                  control={form.control}
                  name="partie_id"
                  label={""}
                  isLabel={false}
                  placeholder="فرۆشیار هەڵبژێرە"
                  className="bg-white dark:bg-black/15 dark:border max-w-[315px] ml-auto"
                  options={
                    customer?.data?.map((customer) => ({
                      value: customer.partie_id.toString(),
                      label: customer.name,
                    })) || []
                  }
                />
                <TextField
                  control={form.control}
                  name="name"
                  label=""
                  placeholder="ناو"
                  className="max-w-[315px] ml-auto"
                />
              </>
            ))}
          {(type === "loan" ||
            type === "outgo" ||
            type === "delivery" ||
            type === "guest") && (
            <TextField
              control={form.control}
              name="phone"
              label=""
              placeholder="ژمارەی مۆبایل"
              className="max-w-[315px] ml-auto"
            />
          )}

          {/* Current List Order State */}
          <ListOrder />

          <TextAreaField
            control={form.control}
            name="note"
            label=""
            placeholder="تێبینی"
            className="dark:bg-white/5 "
          />
          {options?.data?.length === 0 && isLoadingOptions ? (
            <LuLoaderCircle className="animate-spin transition-all duration-500" />
          ) : (
            <FormField
              control={form.control}
              name="options"
              render={() => (
                <FormItem>
                  {options?.data?.map((option) => (
                    <FormField
                      key={option.option_id}
                      control={form.control}
                      name="options"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={option.option_id}
                            className="flex flex-row items-start space-x-3 space-y-0 gap-3 "
                          >
                            <FormControl>
                              <Checkbox
                                className="h-5 w-5 rounded-full"
                                checked={field.value?.includes(
                                  option.option_text
                                )}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        option.option_text,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) =>
                                            value !== option.option_text
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal pt-1">
                              {option.option_text}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </FormItem>
              )}
            />
          )}
          <Button
            type="submit"
            className="bg-primary text-white w-full rounded-lg py-2"
          >
            {pendding ? (
              <LuLoaderCircle className="animate-spin transition-all duration-500" />
            ) : (
              "ناردن بۆ چێشتخانە"
            )}
          </Button>
          {/* Doned Order  */}
          <DonedOrder order_list={order_list} />
          <div className="my-5 grid gap-3">
            <div className="flex items-center gap-2 rounded-md border max-w-max overflow-hidden pr-2 ">
              <p className="">داشکاندن IQD</p>
              <TextField
                control={form.control}
                name="discount_dinar"
                label=""
                className="max-w-[100px] ml-auto rounded-none text-center placeholder:text-center"
              />
            </div>
            <div className="flex items-center gap-2 rounded-md border max-w-max overflow-hidden pr-2  ">
              <p className="pl-4">داشکاندن %</p>
              <TextField
                control={form.control}
                name="discount_percentage"
                label=""
                className="max-w-[100px] ml-auto rounded-none text-center placeholder:text-center"
              />
            </div>
            <div className="flex gap-8 my-4">
              <p className="text-softGray">کۆی گشتی</p>
              <div className="flex items-center gap-1 text-lg">
                <span>IQD</span>
                {/* <p>{totalPriceListOrder?.toLocaleString()}</p> */}
                <p>
                  {Number(
                    calculateDiscountedPrice(
                      totalPriceListOrder || 0,
                      form.watch("discount_dinar") ? "amount" : "percentage",
                      (Number(form.watch("discount_percentage")) as number) ||
                        (Number(form.watch("discount_dinar")) as number)
                    )
                  )?.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="mt-8 mb-5">
              <ButtonsSubmitForm
                form={form}
                order_id={order_list?.order_id?.toString()}
                discount_type={
                  form.watch("discount_dinar") ? "amount" : "percentage"
                }
                note={form.watch("note") as string}
                total_discount_amount={
                  (Number(form.watch("discount_percentage")) as number) ||
                  (Number(form.watch("discount_dinar")) as number)
                }
              />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}

const orderOptions = [
  { value: "normal", label: "ئاسای" },
  { value: "loan", label: "قەرز" },
  { value: "staff", label: "ستاف" },
  { value: "outgo", label: "بردنەدەرەوە" },
  { value: "delivery", label: "گەیاندن" },
  { value: "guest", label: "میوان" },
];

const items = [
  {
    id: "more_sugar",
    label: "شەکری زیادی تێبکە",
  },
  {
    id: "more_salt",
    label: "زیاد برژابێت",
  },
  {
    id: "applications",
    label: "پیازی تیابێت",
  },
  {
    id: "less_sugar",
    label: "کەم برژابێت",
  },
] as const;

"use client";
import { toast } from "sonner";
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
import React, { useTransition } from "react";
import { LuLoaderCircle } from "react-icons/lu";
import { SelectFormField } from "@/components/reusable/reusable-select";
import { addUser, addUserType } from "../../../_type";
import { addUserAction, updateUserAction } from "../../../client-action";
import { useQuery } from "@tanstack/react-query";
import { getAllRolesActive } from "../../../_lib";

type filmFormProps = {
  isEdit?: boolean;
  info?: addUserType;
  handleClose?: () => void;
  id?: number;
};

export default function AddUser({
  isEdit,
  info,
  handleClose,
  id,
}: filmFormProps) {
  const { data: roles, isLoading } = useQuery({
    queryKey: ["active-role"],
    queryFn: getAllRolesActive,
  });
  const [pendding, setPendding] = useTransition();
  const form = useForm<addUserType>({
    resolver: zodResolver(addUser),
    defaultValues: getDefaultValues(info),
  });

  // Reset the form when roles data is available
  React.useEffect(() => {
    if (roles?.data && info?.role_id) {
      form.reset({
        ...form.getValues(),
        role_id: info.role_id, // Set the role_id value
      });
    }
  }, [roles, info, form]);

  console.log("info => ", info);

  function onSubmit(values: addUserType) {
    setPendding(async () => {
      const result = isEdit
        ? await updateUserAction(id as number, values)
        : await addUserAction(values);
      if (result.success) {
        toast.success(result.message);
        handleClose && handleClose();
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="  px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-10">
          {/* <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">وێنە</FormLabel>
                <FileUploader
                  value={field.value ? [field.value] : null}
                  onValueChange={(files) => {
                    const selectedFile = files?.[0] || null;
                    field.onChange(selectedFile);
                  }}
                  dropzoneOptions={{
                    multiple: false,
                    maxFiles: 19,
                    maxSize: sizeImage,
                  }}
                  reSelect={true}
                  className="relative bg-background rounded-lg  "
                >
                  <FileInput className="outline-dashed outline-1 outline-white">
                    <div className="flex items-center justify-center flex-col  ">
                      {field.value && (
                        <div className="flex justify-center gap-3 items-center text-primary w-full py-2.5">
                          <CheckCheck size={20} />
                          <p className="text-sm">Uploaded</p>
                        </div>
                      )}
                      {!field.value && <FileSvgDraw />}
                    </div>
                  </FileInput>
                </FileUploader>
              </FormItem>
            )}
          /> */}

          {Object.entries(form.getValues())
            .slice(0, 3)
            .map(([key, value]) => (
              <FormField
                key={key}
                control={form.control}
                name={key as any}
                render={({ field }) => {
                  const readOnly = key === "quantity";
                  return (
                    <FormItem className=" w-full  max-w-full">
                      <FormLabel>{labelTranslate(field.name)}</FormLabel>
                      <FormControl>
                        <Input
                          readOnly={readOnly}
                          {...field}
                          isform
                          className={cn("w-full ", {
                            "border-red-500":
                              form.formState.errors[
                                field.name as keyof typeof form.formState.errors
                              ],
                          })}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            ))}
          {isLoading ? (
            <SelectFormField
              control={form.control}
              name="role_id"
              label={"ڕۆڵ"}
              placeholder="ڕۆڵ هەڵبژێرە"
              options={[]}
              isForm
            />
          ) : (
            <SelectFormField
              control={form.control}
              name="role_id"
              label={"ڕۆڵ"}
              placeholder="ڕۆڵ هەڵبژێرە"
              options={
                roles?.data?.map((role) => ({
                  value: role.role_id.toString(),
                  label: role.name,
                })) || []
              }
              isForm
            />
          )}
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

const getDefaultValues = (values: Partial<addUserType> = {}) => {
  const defaultValues: addUserType = {
    full_name: "",
    email: "",
    password: "",
    role_id: "",
    image: null,
  };

  return { ...defaultValues, ...values };
};

function labelTranslate(name: string) {
  switch (name) {
    case "full_name":
      return "ناو";
    case "email":
      return "ئیمەیڵ";
    case "password":
      return "وشەی نهێنی";
    case "role_id":
      return "ڕۆڵ";
    default:
      return name;
  }
}

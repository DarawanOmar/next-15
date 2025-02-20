"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllPermission, getOneRole } from "../../_lib";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { addRole, addRoleType } from "../../_type";
import { zodResolver } from "@hookform/resolvers/zod";
import { addRoleAction, updateRoleAction } from "../../_actions";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LuLoaderCircle } from "react-icons/lu";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/reusable/input-form-reusable";
import { LucideLoader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";

const AddRole = () => {
  const { data: permissions, isLoading: isPermissionsLoading } = useQuery({
    queryKey: ["permissions"],
    queryFn: getAllPermission,
  });
  const [id] = useQueryState("id");
  const isEdit = !!id;
  const { data: oneRole, isLoading: isOneRoleLoading } = useQuery({
    queryKey: ["oneRole", id],
    queryFn: () => getOneRole(id as string),
    enabled: !!id,
  });

  const [pending, setPending] = React.useTransition();
  const router = useRouter();
  const form = useForm<addRoleType>({
    resolver: zodResolver(addRole),
    defaultValues: {
      name: "",
      description: "",
      items: [],
    },
  });

  useEffect(() => {
    if (oneRole && !isOneRoleLoading) {
      const roleData = {
        name: oneRole.data?.name,
        description: oneRole.data?.description,
        items: oneRole.data?.permissions.flatMap((category) =>
          category.permissions
            .filter((permission) => permission.have)
            .map((permission) => permission.name)
        ),
      };
      form.reset(roleData);
    }
  }, [oneRole, isOneRoleLoading, form]);

  async function onSubmit(values: addRoleType) {
    setPending(async () => {
      console.log("Values =>", values);
      const result = isEdit
        ? await updateRoleAction(id as string, values)
        : await addRoleAction(values);
      if (result.success) {
        toast.success(result.message);
        router.push("/setting/roles");
      } else {
        toast.error(result.message);
      }
    });
  }

  if (isPermissionsLoading || (isEdit && isOneRoleLoading)) {
    return (
      <div className="flex justify-center items-center mt-52">
        <LuLoaderCircle
          size={40}
          className="text-soft_blue transition-all duration-500 animate-spin"
        />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="pb-10 flex flex-col w-full font-sirwan_reguler"
      >
        <div className="grid grid-cols-1 gap-6 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl">
            <TextField
              control={form.control}
              name="name"
              label="ناوی ئەرک"
              classFormItem="w-full"
            />
            <TextField
              control={form.control}
              name="description"
              label="تێبینی"
              classFormItem="w-full col-span-2"
            />

            <Button
              type="submit"
              className="block max-w-[150px] w-full self-end"
            >
              {pending ? (
                <LucideLoader2 className="size-5 animate-spin flex justify-center items-center mx-auto" />
              ) : id ? (
                "نوێ کردنەوە"
              ) : (
                "پەسند کردن"
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 my-7">
            {permissions?.data?.map((role) => (
              <div
                key={role.category}
                className="mb-12 flex flex-col bg-white rounded-2xl p-5"
              >
                <h3 className="font-sirwan_meduim text-base sm:text-xl text-nowrap mb-3 text-soft_blue">
                  {role.category}
                </h3>
                <div>
                  {role.permissions.map((permission) => (
                    <FormField
                      key={permission.permission_id}
                      control={form.control}
                      name="items"
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-3">
                          <FormControl>
                            <Checkbox
                              className="h-5 w-5"
                              checked={field.value?.includes(permission.name)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...field.value,
                                      permission.name,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (v) => v !== permission.name
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm pb-2 font-sirwan_meduim">
                            {permission.name}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>
            ))}
            <FormMessage />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default AddRole;

const getDefaultValues = (values: Partial<addRoleType> = {}) => {
  const defaultValues: addRoleType = {
    name: "",
    description: "",
    items: [],
  };

  return { ...defaultValues, ...values };
};

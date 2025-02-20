import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { LucideLoader2 } from "lucide-react";
import { getAllCategoryItem } from "../../setting/_lib";
import { getItems } from "../_lib";
import { useForm } from "react-hook-form";
import { addProductType } from "../_type";
import { expensesWarehouseType } from "../../daliy-expenses/_type";

type Props = {
  form: ReturnType<typeof useForm<any>>;
  setOpenFastSale?: React.Dispatch<React.SetStateAction<boolean>>;
};

function FastSale({ form, setOpenFastSale }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getItems(""),
  });
  const { data: category, isLoading: categoryLoading } = useQuery({
    queryKey: ["category_item"],
    queryFn: getAllCategoryItem,
  });

  const [listProduct, setListProduct] = React.useState<any[] | undefined>(
    undefined
  );
  const [listProductCategory, setListProductCategory] = React.useState<
    any[] | undefined
  >(undefined);
  const [selected, setSelected] = React.useState<string>("هەموو");

  React.useEffect(() => {
    if (data?.data && category?.data) {
      setListProduct(data.data);
      const uniqueCategories = [
        {
          item_category_id: "all",
          name: "هەموو",
        },

        ...category.data,
      ];
      setListProductCategory(uniqueCategories);
    }
  }, [data, category]);

  console.log(category?.data);

  const filterProduct = (item: any) => {
    const filter = listProduct?.filter((item) => item.item_id !== item.item_id);
    setListProduct(filter);
    form.setValue("item_id", item.item_id);
    form.setValue("name", item.name);
    form.setValue("unit", item.unit);
    form.setValue("price", item.inventorys[0]?.fare_price_per_item);
    form.setValue("barcode", item.barcode);
    setOpenFastSale && setOpenFastSale(false);
  };

  const filterCategory = (category: string) => {
    if (category === "هەموو") {
      setListProduct(data?.data || []);
    } else {
      const filter = data?.data?.filter(
        (item) => item.category_name === category
      );
      setListProduct(filter || []);
    }
  };
  return (
    <div className="min-w-0 w-full flex flex-col items-center p-3 md:p-4  gap-1 min-h-96 ">
      {isLoading || categoryLoading ? (
        <div className="flex justify-center items-center h-full gap-3">
          Loading
          <LucideLoader2 className="size-5 animate-spin" />
        </div>
      ) : (
        <>
          <div className=" max-w-[300px] sm:max-w-[550px] md:max-w-[700px] w-full ">
            <div className=" flex items-center gap-4 overflow-x-auto ">
              {listProductCategory?.map((item, index) => (
                <Button
                  variant={"outline"}
                  key={index}
                  onClick={() => {
                    setSelected(item.item_category_id);
                    filterCategory(item.name);
                  }}
                  className={cn(
                    "min-w-32 hover:bg-primary hover:text-white hover:opacity-70",
                    {
                      "bg-primary text-white":
                        selected === item.item_category_id,
                    }
                  )}
                >
                  <span>{item.name}</span>
                </Button>
              ))}
            </div>
          </div>
          {listProduct?.length === 0 ? (
            <div className="flex justify-center items-center mt-10">
              <Image
                src={"/empty.svg"}
                alt={"empty"}
                height={400}
                width={400}
                priority
                className="mx-auto object-cover  "
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-5 w-full mt-10 ">
              {listProduct?.map((item, index) => (
                <div
                  className="bg-white dark:bg-white/5 rounded-2xl shadow-sm border p-4 flex flex-col cursor-pointer justify-center w-full items-center hover:shadow-xl transition-all duration-500 relative"
                  key={index}
                >
                  <Image
                    src={
                      item.image
                        ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${item.image}`
                        : "/logo.png"
                    }
                    alt={item.name}
                    width={500}
                    height={500}
                    className="rounded-full size-28 broder-4 border-primary object-cover object-center "
                    priority
                  />
                  <h1 className="text-primary text-lg font-bold mt-2">
                    {item.name}
                  </h1>

                  <hr className="my-3 w-full  " />
                  <div className="flex justify-between  max-w-max mx-auto gap-5 text-muted-foreground ">
                    <p>یەکە : </p>
                    <p>{item.unit}</p>
                  </div>
                  <div className="flex justify-between  max-w-max mx-auto gap-5 text-muted-foreground my-2 ">
                    <p>کڕین : </p>
                    <p>
                      {item.inventorys.length > 0
                        ? item.inventorys[0]?.fare_price_per_item
                        : 0}
                    </p>
                  </div>
                  <Button
                    size="icon"
                    className="mt-3"
                    onClick={() => {
                      filterProduct(item);
                    }}
                  >
                    <FaPlus className="text-white " size={18} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default FastSale;

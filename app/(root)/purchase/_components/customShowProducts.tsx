"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { deleteItemInvoice } from "../_actions";
import { toast } from "sonner";
import React from "react";
import { LuLoaderCircle } from "react-icons/lu";
import { deleteItemExpensesInvoice } from "../../daliy-expenses/_actions";

type Props = {
  selectedProducts: any[];
  isPurchase?: boolean;
};

export default function CustomShowProducts({
  selectedProducts,
  isPurchase = true,
}: Props) {
  return (
    <>
      <ProductsTable
        className="w-full mt-4"
        products={selectedProducts}
        isPurchase={isPurchase}
      />
    </>
  );
}

type table = {
  products: any;
  className: string;
  isPurchase?: boolean;
};

function ProductsTable({ products, className, isPurchase }: table) {
  const [pendding, setPendding] = React.useTransition();
  const [deleteId, setDeleteId] = React.useState<number | null>(null);
  return (
    <Table className={cn("border mt-4  w-full", className)}>
      <TableHeader className=" font-sirwan">
        <TableRow className=" ">
          <TableHead className="text-center ">وێنە</TableHead>
          <TableHead className="text-center ">ناو</TableHead>
          <TableHead className="text-center "> نرخی کڕین</TableHead>
          {isPurchase ? (
            <TableHead className="text-center ">یەکە</TableHead>
          ) : null}
          <TableHead className="text-center "> بڕ</TableHead>
          <TableHead className="text-center">سڕینەوە</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="font-sirwan_thin">
        {products && products?.length > 0 ? (
          products?.map((product: any, index: any) => (
            <TableRow key={index}>
              <TableCell className="flex justify-center items-center text-center">
                <div className="font-sirwan_thin flex items-center gap-3 ">
                  <Image
                    className="rounded-full border-primary border-2 size-10"
                    src={
                      product.image
                        ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${product.image}`
                        : "/logo.png"
                    }
                    alt={product.name}
                    height={50}
                    width={50}
                    priority
                  />
                </div>
              </TableCell>
              <TableCell className="text-center">{product.name}</TableCell>
              <TableCell className="text-center">
                {Number(product?.item_price)?.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}
              </TableCell>
              {isPurchase ? (
                <TableCell className="text-center">
                  {Number(product?.item_price)?.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
              ) : null}
              <TableCell className="text-center">{product?.quantity}</TableCell>
              <TableCell className="text-center">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const id = product?.invoice_item_id;
                    setDeleteId(id);
                    setPendding(async () => {
                      const res =
                        isPurchase || product?.item_id !== null
                          ? await deleteItemInvoice(id)
                          : await deleteItemExpensesInvoice(id);
                      if (res.success) {
                        toast.success(res.message);
                        setDeleteId(null);
                      } else {
                        toast.error(res.message);
                        setDeleteId(null);
                      }
                    });
                  }}
                >
                  <Button
                    size="icon"
                    type="submit"
                    variant="outline"
                    className="bg-red-200 hover:bg-red-300 p-2 cursor-pointer"
                  >
                    {deleteId === product?.invoice_expense_id ||
                    deleteId === product?.invoice_item_id ? (
                      <LuLoaderCircle className="animate-spin transition-all duration-500" />
                    ) : (
                      <Trash2 className="size-9 rounded-lg" color="red" />
                    )}
                  </Button>
                </form>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={7}
              className="text-center font-semibold font-sirwan text-red-500 p-10"
            >
              هیچ کاڵایەک نەدۆزرایەوە!{" "}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

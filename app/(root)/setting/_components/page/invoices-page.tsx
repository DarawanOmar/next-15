import TitlePage from "@/components/layout/title-page";
import Search, { FallBackInput } from "@/components/reusable/search";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import ReusableSelect from "@/components/reusable/reusable-select-component";
import { DatePickerWithRange } from "@/components/layout/date-picker-with-range";
import { InvoiceType } from "../../[...slug]/page";
import DollarChanger from "@/components/reusable/dollar-changer";
import ButtonsDayFillter from "./_invoice-components/buttons-day-fillter";
import FeedCard from "./_invoice-components/feed-card";
import SkelotonCard from "@/components/reusable/skeloton-card";

type Props = {
  type: InvoiceType;
  searchParams: searchParamsType;
};

async function InvoicePage({ type, searchParams }: Props) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <TitlePage text=" ڕێکخستنەکان" />
        <div className="flex items-center gap-5">
          <DollarChanger />
          <Suspense fallback={<FallBackInput />}>
            <Search />
          </Suspense>
        </div>
      </div>
      <div className="flex justify-between items-center my-5">
        <Link
          href={"/setting"}
          className="font-sirwan_meduim flex items-center gap- max-sm:text-lg text-xl hover:text-primary transition-all duration-300"
        >
          <ChevronRight size={30} />
          پسووڵەکان
        </Link>
        <Suspense fallback={<FallBackInput />}>
          <ReusableSelect
            queryName="type"
            options={invoice}
            defaultValue="buy"
            placeholder="جۆری پسووڵە"
            className="w-[150px]"
          />
        </Suspense>
      </div>
      {type !== "sale" ? (
        <div className="flex justify-between items-center ">
          <Suspense fallback={<FallBackInput />}>
            <ButtonsDayFillter />
          </Suspense>
          <div className="flex items-center gap-5">
            <Suspense fallback={<FallBackInput />}>
              <DatePickerWithRange />
            </Suspense>
            {type !== "expense" ? (
              <Suspense fallback={<FallBackInput />}>
                <ReusableSelect
                  queryName="payment_type"
                  options={type_invoice}
                  defaultValue=""
                  placeholder="پسووڵە"
                  className="w-[100px]"
                />
              </Suspense>
            ) : null}
          </div>
        </div>
      ) : null}
      <Suspense
        fallback={
          <SkelotonCard height="h-32 rounded-3xl" className="2xl:grid-cols-5" />
        }
      >
        <FeedCard searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

export default InvoicePage;

const type_invoice = [
  { value: "all", label: "هەموو" },
  { value: "cash", label: "کاش" },
  { value: "loan", label: "قەرز" },
];
const invoice = [
  { value: "buy", label: "پسولەی کڕین" },
  { value: "expense", label: "پسولەی خەرجی" },
  { value: "order", label: "پسولەی داواکاری" },
  { value: "sale", label: "پسولەی پارەدان" },
];

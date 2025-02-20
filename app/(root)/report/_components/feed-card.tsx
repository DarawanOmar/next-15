import React from "react";
import { getAllReport } from "../_lib";
import { cn } from "@/lib/utils";
import MostPoupulerOnes from "./most-poupler-ones";
import CustomDialog from "@/components/reusable/resusable-dialog";
import ModalMore from "./modal-more";

async function FeedCard({ searchParams }: { searchParams: searchParamsType }) {
  const time = (await searchParams).time || "";
  const date = (await searchParams).range || "";
  const allReport = await getAllReport(time as string, date as string);
  const data = [
    {
      name: "کڕین",
      prices: [
        {
          name: "کاش",
          price: allReport.data?.buy_report.cash_buy?.toLocaleString(),
        },
        {
          name: "قەرز",
          price: allReport.data?.buy_report.loan_buy?.toLocaleString(),
        },
        {
          name: "گشتی",
          price: allReport.data?.buy_report.total_buy?.toLocaleString(),
        },
      ],
    },
    {
      name: "فرۆشتن",
      prices: [
        {
          name: "کاش",
          price: allReport.data?.sale_report.cash_sale_sale?.toLocaleString(),
        },
        {
          name: "قەرز",
          price: allReport.data?.sale_report.loan_sale?.toLocaleString(),
        },
        {
          name: "گشتی",
          price: allReport.data?.sale_report.total_sale?.toLocaleString(),
        },
      ],
    },
    {
      name: "قازانج",
      prices: [
        {
          name: "کاش",
          price: allReport.data?.total_profit?.toLocaleString(),
        },
      ],
    },
    {
      name: "خەرجی",
      prices: [
        {
          name: "کۆگا",
          price: allReport.data?.total_profit?.toLocaleString(),
        },
        {
          name: "کۆگا",
          price: allReport.data?.total_profit?.toLocaleString(),
        },
        {
          name: "کۆگا",
          price: allReport.data?.total_profit?.toLocaleString(),
        },
        {
          name: "کۆگا",
          price: allReport.data?.total_profit?.toLocaleString(),
        },
        {
          name: "کۆگا",
          price: allReport.data?.total_profit?.toLocaleString(),
        },
      ],
    },
    {
      name: "قاسە",
      prices: [
        {
          name: "قاسەی A",
          price: allReport.data?.total_profit?.toLocaleString(),
        },
        {
          name: "قاسەی B",
          price: allReport.data?.total_profit?.toLocaleString(),
        },
      ],
    },
  ];
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 my-10">
        {data?.map((report) => (
          <div
            key={report.name}
            className={cn(
              "flex flex-col justify-center items-center gap-10 bg-white dark:bg-white/5 dark:border rounded-3xl shadow-lg p-7",
              {
                "col-span-1": report.name !== "خەرجی",
                "col-span-1 lg:col-span-2": report.name === "خەرجی", // Take 2 columns on sm screens and above
              }
            )}
          >
            <div className="flex items-center gap-5">
              <p className="text-softGray">کۆی گشتی</p>
              <div
                className={cn("rounded-full px-4 py-2 ", {
                  "bg-blueSoft text-blue": report.name === "کڕین",
                  "bg-primary10 text-primary": report.name === "فرۆشتن",
                  "bg-successSoft text-success": report.name === "قازانج",
                  "bg-[#D000001A]/10 text-error": report.name === "خەرجی",
                  "bg-table ": report.name === "قاسە",
                })}
              >
                {report.name}
              </div>
            </div>
            <div
              className={cn(
                "flex flex-wrap justify-between  items-center   gap-3 w-full px-5",
                {
                  "justify-center gap-10":
                    report.name === "قازانج" || report.name === "قاسە",
                }
              )}
            >
              {report.prices.map((price, i) => (
                <React.Fragment key={i}>
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-softGray">{price.name}</p>
                    <span>{price.price || 0}</span>
                  </div>
                  {i !== report.prices.length - 1 && (
                    <div className="w-[1px] h-full bg-border rounded-full"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="">
        <h1 className="text-softGray text-xl font-sirwan_meduim">
          زۆرترین خواستیان لەسەربووە
        </h1>
        <MostPoupulerOnes report={allReport.data} />
        <CustomDialog
          text_button="زیاتر ببینە"
          title="زۆرترین خواستیان لەسەربووە"
          className="block mx-auto"
          classContent="max-w-3xl "
          iconPlacement="left"
        >
          <ModalMore report={allReport.data} />
        </CustomDialog>
      </div>
      <div className="my-10 grid gap-5">
        <h1 className="text-softGray text-xl font-sirwan_meduim">
          کڕین بەپێی کاشێر
        </h1>
        {allReport.data?.user_sale.length === 0 ? (
          <div className="text-start text-error rounded-xl bg-white dark:bg-white/15 p-10 max-w-max">
            هیچ کاشێرێک نییە لەم کاتەدا
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 ">
            {allReport.data?.user_sale?.map((user) => (
              <div
                className="bg-white dark:bg-white/15 rounded-xl dark:border p-6 text-center grid gap-2"
                key={user.user_id}
              >
                <p className="text-lg">{user.user_name ?? "سارا ئەحمەد"}</p>
                <p className="bg-table rounded-full px-2  max-w-max mx-auto">
                  {user.total_sale?.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default FeedCard;

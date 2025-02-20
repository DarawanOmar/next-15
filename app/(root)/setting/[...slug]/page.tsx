import React from "react";
import RolePage from "../_components/page/role-page";
import ActivityHistoryPage from "../_components/page/activity-history-page";
import InvoicePage from "../_components/page/invoices-page";
import NotFound from "@/components/reusable/not-found";
import UserPageSetting from "../_components/page/users-page";
import OneInvoiceID from "../_components/page/one-invoice-id";
import AddRolePage from "../_components/page/add-role-page";
import ExpensesPage from "../_components/page/expneses-page";

export type InvoiceType = "buy" | "expense" | "order" | "sale";

type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: searchParamsType;
};

async function PagesPage({ params, searchParams }: Props) {
  const page = (await params).slug;
  const type_invoice = (await searchParams).type || ("buy" as InvoiceType);
  const firstPage = page[0];
  const secondPage = page[1];

  if (secondPage && secondPage === "add") {
    return <AddRolePage />;
  }
  if (secondPage && secondPage !== "add") {
    return <OneInvoiceID type={firstPage as InvoiceType} id={secondPage} />;
  }
  if (firstPage === "roles") {
    return <RolePage />;
  }
  if (firstPage === "invoices") {
    return (
      <InvoicePage
        type={type_invoice as InvoiceType}
        searchParams={searchParams}
      />
    );
  }
  if (firstPage === "activity-history") {
    return <ActivityHistoryPage searchParams={searchParams} />;
  }
  if (firstPage === "users") {
    return <UserPageSetting searchParams={searchParams} />;
  }
  if (firstPage === "expenses") {
    return <ExpensesPage searchParams={searchParams} />;
  }

  return <NotFound />;
}

export default PagesPage;

import React from "react";
import { SelectFormField } from "../reusable/reusable-select";

function LoadingSelectSkeleton({ form }: { form: any }) {
  return (
    <SelectFormField
      control={form.control}
      name="partie_id"
      label={""}
      isLabel={false}
      placeholder="دابینکەر هەڵبژێرە"
      className="bg-white dark:bg-black/15 dark:border"
      options={[]}
      isForm
    />
  );
}

export default LoadingSelectSkeleton;

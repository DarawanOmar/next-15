import { Button } from "@/components/ui/button";
import React from "react";
import { useReactToPrint } from "react-to-print";

function Invoice() {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  return (
    <div>
      <div ref={contentRef}>Content to print</div>
      <Button onClick={() => reactToPrintFn()}>Print</Button>
    </div>
  );
}

export default Invoice;

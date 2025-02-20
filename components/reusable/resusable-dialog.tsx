import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import React from "react";
import { Button } from "../ui/button";
import { MdClose } from "react-icons/md";

export type PropsCustomDialog = {
  button?: React.ReactNode;
  icon?: React.ReactNode | React.ElementType | any;
  className?: string;
  text_button?: string;
  isFreshButtonPass?: boolean;
  classContent?: string;
  title?: string;
  closeButton?: boolean;
  isWithouTrigger?: boolean;
  iconPlacement?: "left" | "right";
  classIcon?: string;
} & React.ComponentPropsWithoutRef<typeof Dialog>;

function CustomDialog({
  icon,
  className,
  button,
  isFreshButtonPass,
  classContent,
  text_button,
  title = "زیادکردنی کاڵا",
  closeButton = false,
  isWithouTrigger,
  iconPlacement,
  classIcon,
  ...props
}: PropsCustomDialog) {
  return (
    <Dialog {...props}>
      {isWithouTrigger ? null : (
        <DialogTrigger asChild>
          {isFreshButtonPass ? (
            <div>{button}</div>
          ) : (
            <Button
              type="button"
              classIcon={classIcon}
              iconPlacement={iconPlacement}
              icon={icon}
              effect={"shine"}
              className={cn("", className)}
            >
              {text_button}
            </Button>
          )}
        </DialogTrigger>
      )}
      <DialogContent
        className={cn(
          "font-sirwan_reguler max-w-4xl w-full overflow-x-hidden overflow-y-scroll  max-h-[95%] border-none bg-white dark:bg-background ",
          classContent
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-center  text-[25px]">
            {title}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {closeButton && (
          <DialogClose className="z-10 cursor-pointer" asChild>
            <div
              about="close button modal"
              className={cn(
                "flex items-center justify-center absolute top-4 size-7 start-5 bg-dark_gray rounded-full"
              )}
            >
              <MdClose className="size-4 p-1 text-dark_blue w-full h-full" />
            </div>
          </DialogClose>
        )}
        <div className="">{props.children}</div>
      </DialogContent>
    </Dialog>
  );
}

export default CustomDialog;

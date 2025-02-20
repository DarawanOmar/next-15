"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import CustomDialog, { PropsCustomDialog } from "./resusable-dialog";
import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";
import { LuLoaderCircle } from "react-icons/lu";
import { PiWarningCircle } from "react-icons/pi";
import { ArchiveIcon } from "@/public/icons";

type DialogModalProps = {
  id: string;
  actionDelete: (
    id: string,
    options?: any
  ) => Promise<{ message: string; success: boolean }>;
  classButton?: string;
  title?: string;
  isDeActive?: boolean;
} & PropsCustomDialog;

function ReusableDeleteDailog({
  actionDelete,
  id,
  classButton,
  title = "دڵنیای لە سڕینەوەی ئەم داتایە!",
  isDeActive,
  ...props
}: DialogModalProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [pending, setPending] = React.useState(false);

  const handleClose = () => {
    setOpen((prev) => !prev);
  };

  const handleDelete = async () => {
    setPending(true);
    try {
      const res = await actionDelete(id);
      if (res.success) {
        toast.success(res.message);
        handleClose();
        router.refresh();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("An error occurred while deleting.");
    } finally {
      setPending(false);
    }
  };

  return (
    <CustomDialog
      open={open}
      onOpenChange={setOpen}
      {...props}
      classContent="max-w-[433px] h-[293px] sm:rounded-xl p-0 "
      title=""
    >
      <div className="flex flex-col justify-center items-center">
        {/* Trash Icon */}
        <div className="relative w-[70px] h-[70px] ">
          {/* Blue background with blur effect */}
          <div className="w-full h-full rounded-full bg-primary blur-md"></div>
          {/* Centered Icon */}
          <div className="absolute inset-0 flex items-center justify-center text-white">
            {isDeActive ? (
              <ArchiveIcon height={30} width={30} />
            ) : (
              <PiWarningCircle size={35} />
            )}
          </div>
        </div>

        {/* Title */}
        <div className="text-lg my-7 text-center">{title}</div>
      </div>
      <div className="flex justify-between items-center gap-10 w-full px-10">
        <Button
          onClick={handleDelete}
          className="text-lg w-full py-[23px] bg-primary hover:bg-error"
          disabled={pending}
        >
          {pending ? (
            <LuLoaderCircle className="animate-spin transition-all duration-500" />
          ) : (
            "بەڵێ"
          )}
        </Button>
        <DialogClose asChild>
          <Button
            type="button"
            className="border bg-transparent text-black dark:text-white text-lg w-full py-[23px]"
          >
            نەخێر
          </Button>
        </DialogClose>
      </div>
    </CustomDialog>
  );
}

export default ReusableDeleteDailog;

// "use client";
// import { useRouter } from "next/navigation";
// import React from "react";
// import { toast } from "sonner";
// import CustomDialog, { PropsCustomDialog } from "./resusable-dialog";
// import { Button } from "../ui/button";
// import { DialogClose } from "../ui/dialog";
// import { LuLoaderCircle } from "react-icons/lu";
// import { PiWarningCircle } from "react-icons/pi";
// import { ArchiveIcon } from "@/public/icons";

// type DialogModalProps = {
//   id: string;
//   actionDelete: (
//     id: string,
//     options?: any
//   ) => Promise<{ message: string; success: boolean }>;
//   classButton?: string;
//   title?: string;
//   isDeActive?: boolean;
// } & PropsCustomDialog;

// function ReusableDeleteDailog({
//   actionDelete,
//   id,
//   classButton,
//   title = "دڵنیای لە سڕینەوەی ئەم داتایە!",
//   isDeActive,
//   ...props
// }: DialogModalProps) {
//   const router = useRouter();
//   const [open, setOpen] = React.useState(false);
//   const [pending, setPending] = React.useTransition();
//   const handleClose = () => {
//     setOpen((prev) => !prev);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     setPending(async () => {
//       e.preventDefault();
//       const res = await actionDelete(id);
//       if (res.success) {
//         toast.success(res.message);
//         handleClose();
//         router.refresh();
//       } else {
//         toast.error(res.message);
//       }
//     });
//   };
//   return (
//     <CustomDialog
//       open={open}
//       onOpenChange={setOpen}
//       {...props}
//       classContent="max-w-[433px] h-[293px] sm:rounded-xl p-0 "
//       title=""
//     >
//       <div className="flex flex-col  justify-center items-center">
//         {/* Trash Icon */}
//         <div className="relative w-[70px] h-[70px] ">
//           {/* Blue background with blur effect */}
//           <div className="w-full h-full rounded-full bg-primary  blur-md"></div>
//           {/* Centered Icon */}
//           <div className="absolute inset-0 flex items-center justify-center text-white">
//             {isDeActive ? (
//               <ArchiveIcon height={30} width={30} />
//             ) : (
//               <PiWarningCircle size={35} />
//             )}
//           </div>
//         </div>

//         {/*  Title*/}
//         <div className="text-lg my-7 text-center ">{title}</div>
//       </div>
//       <form
//         id="form-delete"
//         onSubmit={handleSubmit}
//         className="flex justify-between items-center gap-10  w-full px-10"
//       >
//         <Button
//           // type="submit"
//           form="form-delete"
//           className=" text-lg w-full py-[23px] bg-primary hover:bg-error"
//         >
//           {pending ? (
//             <LuLoaderCircle className="animate-spin transition-all duration-500" />
//           ) : (
//             "بەڵێ"
//           )}
//         </Button>
//         <DialogClose asChild>
//           <Button
//             type="button"
//             className="border bg-transparent text-black dark:text-white text-lg w-full py-[23px] "
//           >
//             نەخێر
//           </Button>
//         </DialogClose>
//       </form>
//     </CustomDialog>
//   );
// }

// export default ReusableDeleteDailog;

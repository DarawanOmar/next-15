import Image from "next/image";
import React from "react";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import login from "@/public/logo.png";
import Link from "next/link";
import CustomDialog from "@/components/reusable/resusable-dialog";
import { CircleAlert } from "lucide-react";
function MenuPAge() {
  return (
    <div className="p-6 w-full max-w-full overflow-x-hidden">
      <div className="flex flex-row justify-between itemscenter ">
        <Image
          src={login}
          alt="Login"
          className="size-12 rounded-full object-cover"
          priority
        />
        <div className="flex flex-wrap  max-sm:gap-2 gap-5">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.id}
              className="rounded-full bg-muted  p-3 "
              target="_blank"
            >
              {link.icon}
            </Link>
          ))}
        </div>
      </div>
      <div>
        <p className="text-lg font-sirwan_meduim my-5">
          خواردنەکەکانی چێشتخانە
        </p>
        <div className="flex flex-row  gap-3 overflow-x-scroll snap-mandatory bg-transparent">
          {Array.from({ length: 15 }).map((_, index) => (
            <div
              key={index}
              className="bg-white dark:bg-white/5 dark:border p-5 rounded-3xl  border  flex flex-col justify-center items-center cursor-pointer relative min-w-[200px] max-w-[250px] w-full mt-8 mb-1  "
            >
              <CustomDialog
                isFreshButtonPass
                classContent="max-w-md"
                title="کورتە"
                button={
                  <button className="absolute top-2 left-2 text-softGray">
                    <CircleAlert size={18} />
                  </button>
                }
              >
                <div className="p-1">
                  <p>
                    لێرە باسێکی کورتی خواردنەکە داکەیت لە چی پێکهاتووە و
                    پێکهاتەکانی چی و جییە و تاچەند خواستی لەسەر
                  </p>
                  <p className="border border-border px-3 py-2 max-w-max mt-5 rounded-full">
                    250 کالۆری
                  </p>
                </div>
              </CustomDialog>
              <div className="absolute -top-8 mx-auto">
                <Image
                  src={"/logo.png"}
                  alt="logo"
                  width={100}
                  height={100}
                  className="rounded-full object-cover "
                />
              </div>
              <div className="flex flex-col justify-center items-center gap5 mt-16">
                <p className="text-lg">بریانی گۆشت</p>
                <div className="flex gap-1 mt-2">
                  <span className="text-softGray">IQD</span>
                  <p className="text-softGray text-base">12,000</p>
                </div>{" "}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MenuPAge;
const links = [
  {
    id: 1,
    href: "https://www.facebook.com/profile.php?id=61550942510328&mibextid=ZbWKwL",
    icon: <FaFacebookF size={24} className="text-primary" />,
  },
  {
    id: 2,
    href: "https://wa.me/+9647707652733",
    icon: <FaWhatsapp size={24} className="text-primary" />,
  },

  {
    id: 4,
    href: "https://www.instagram.com/shamar_appliance?igsh=MTFldmdtcXMyancyaA==",
    icon: <AiFillInstagram size={24} className="text-primary" />,
  },
];

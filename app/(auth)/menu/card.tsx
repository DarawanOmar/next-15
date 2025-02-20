import Image from "next/image";
import React from "react";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import login from "@/public/logo.png";
import Link from "next/link";
function Card() {
  return (
    <div className="p-6 w-full max-w-full overflow-x-hidden">
      <div className="flex flex-row-reverse justify-between itemscenter ">
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
    </div>
  );
}

export default Card;
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

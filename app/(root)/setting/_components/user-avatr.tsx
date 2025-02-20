import Image from "next/image";
import React from "react";

function UserAvatar() {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={"/logo.png"}
        alt="logo"
        height={40}
        width={40}
        className="rounded-full border-2"
      />
      <p className="text-softGray text-xs">Admin@gmail.com</p>
    </div>
  );
}

export default UserAvatar;

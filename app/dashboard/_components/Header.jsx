import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React, { useContext } from "react";

function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext)

  return (
    <div className="flex items-center justify-between w-full">
      <div>
        <Image src={"/video-ai-logo.png"} alt="logo" width={150} height={50} />
      </div>
      <div className="flex items-center gap-5">
        <ModeToggle />
        <div className="flex gap-1 items-center">
          <Image src="/coin.png" alt="coin" width={20} height={20}/>
          <h2>{userDetail?.credits}</h2>
        </div>
        <Button>Dashboard</Button>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;

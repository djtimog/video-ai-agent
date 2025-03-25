import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import { PanelsTopLeft } from "lucide-react";
import Image from "next/image";
import React from "react";

function Header() {
  return (
    <div className="flex items-center justify-between w-full">
      <div>
        <Image src={"/video-ai-logo.png"} alt="logo" width={150} height={50} />
      </div>
      <div className="flex items-center gap-5">
        <ModeToggle />
        <Button>Dashboard</Button>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;

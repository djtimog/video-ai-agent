"use client";
import React, { useEffect, useState } from "react";
import Header from "./_components/Header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { VideoDataContext } from "../_context/VideoDataContext";
import { UserDetailContext } from "../_context/UserDetailContext";
import { useUser } from "@clerk/nextjs";
import { Users } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { db } from "@/configs/db";

function DashboardLayout({ children }) {
  const [videoData, setVideoData] = useState([]);
  const [userDetail , setUserDetail] = useState([]);
 const { user } = useUser();

 const getUserDetails = async () => {
   const result = await db
     .select()
     .from(Users)
     .where(
       eq(Users?.email, user?.primaryEmailAddress?.emailAddress)
     );
     setUserDetail(result[0]);
 };

  useEffect(() => {

    user && getUserDetails();
  }, [user]);

  return (
    <UserDetailContext.Provider value={{userDetail , setUserDetail}}>
      <VideoDataContext.Provider value={{ videoData, setVideoData }}>
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full h-screen">
            <div>
              <div className="flex items-center bg-white dark:bg-black shadow-md sticky top-0 w-full z-10 px-5 py-3">
                <SidebarTrigger className={"text-2xl"} />
                <Header />
              </div>
              <div className="px-5 w-full">{children}</div>
            </div>
          </main>
        </SidebarProvider>
      </VideoDataContext.Provider>
    </UserDetailContext.Provider>
  );
}

export default DashboardLayout;

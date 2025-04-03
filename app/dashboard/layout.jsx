"use client";
import React, { useState } from "react";
import Header from "./_components/Header";
// import SideNav from "./_components/SideNav";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { VideoDataContext } from "../_context/VideoDataContext";

function DashboardLayout({ children }) {
  const [videoData, setVideoData] = useState([]);

  return (
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
  );
}

export default DashboardLayout;

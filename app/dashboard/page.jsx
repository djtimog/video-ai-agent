"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import EmptyState from "./_components/EmptyState";
import Link from "next/link";
import { db } from "@/configs/db";
import { VideoData } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import VideoList from "./_components/VideoList";

function Dashboard() {
  const [videoList, setVideoList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const getVideoList = async () => {
      const result = await db
        .select()
        .from(VideoData)
        .where(
          eq(VideoData?.createdBy, user?.primaryEmailAddress?.emailAddress)
        );
      setVideoList(result);
    };

    user && getVideoList();
  }, [user]);

  return (
    <div className="md:px-10 lg:px-20">
      <div className="w-full flex items-center justify-between p-5">
        <h2 className="font-bold text-2xl text-primary">Dashboard</h2>
        <Link href="/dashboard/create-new">
          <Button> + Create New </Button>
        </Link>
      </div>

      {videoList.length === 0 ? (
        <div>
          <EmptyState />
        </div>
      ) : (
        <VideoList videoList={videoList} />
      )}
    </div>
  );
}

export default Dashboard;

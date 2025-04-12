"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/components/ui/button";
import { eq } from "drizzle-orm";
import { VideoData } from "@/configs/schema";
import { db } from "@/configs/db";
import { useRouter } from "next/navigation";

function PlayerDialog({ playVideo, videoId }) {
  
  const [openDialog, setOpenDialog] = useState(true);
  const [videoData, setVideoData] = useState(null);
  const [durationInFrame, setDurationInFrame] = useState(120);
  const router = useRouter();

  useEffect(() => {
    setOpenDialog(!openDialog);
    GetVideoData();
  }, [playVideo]);

  const GetVideoData = async () => {
    const result = await db
      .select()
      .from(VideoData)
      .where(eq(VideoData.id, videoId));

    setVideoData(result[0]);
    console.log(result[0]);
  };

  return (
    <Dialog open={openDialog}>
      <DialogContent className={"flex flex-col items-center"}>
        <DialogHeader>
          <DialogTitle className={"text-3xl font-bold my-5"}>
            Your Video is Ready
          </DialogTitle>
          <div>
            <Player
              component={RemotionVideo}
              durationInFrames={Number(durationInFrame.toFixed(0))}
              compositionWidth={300}
              compositionHeight={450}
              fps={30}
              controls
              inputProps={{
                ...videoData,
                setDurationInFrame: (frameValue) =>
                  setDurationInFrame(frameValue),
              }}
            />
            <div className="flex gap-10 mt-10">
              <Button
                variant={"ghost"}
                onClick={() => {
                  router.replace("/daShboard");
                  setOpenDialog(false);
                }}
              >
                Cancel
              </Button>
              <Button>Export</Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default PlayerDialog;

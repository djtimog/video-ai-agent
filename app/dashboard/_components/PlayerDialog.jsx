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

function PlayerDialog({ playVideo, videoId }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    setOpenDialog(playVideo);
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
              durationInFrames={120}
              compositionWidth={300}
              compositionHeight={450}
              fps={30}
              inputProps={{ ...videoData }}
            />
            <div className="flex gap-10">
              <Button variant={"ghost"}>Cancel</Button>
              <Button>Export</Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default PlayerDialog;

"use client";
import React, { useState } from "react";
import { Thumbnail } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import PlayerDialog from "./PlayerDialog";

function VideoList({ videoList }) {
  const [openPlayDialog, setOpenPlayDialog] = useState(false);
  const [videoId, setVideoId] = useState(0);

  return (
    <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {videoList.map((video, index) => (
        <div
          className="cursor-pointer hover:scale-105 transition-all"
          key={index}
          onClick={() => {
            setOpenPlayDialog(Date.now());
            setVideoId(video.id);
          }}
        >
          <Thumbnail
            component={RemotionVideo}
            compositionWidth={250}
            compositionHeight={400}
            frameToDisplay={30}
            durationInFrames={120}
            fps={30}
            style={{
              borderRadius: 15,
            }}
            inputProps={{
              ...video,
            }}
          />
        </div>
      ))}
      <PlayerDialog playVideo={openPlayDialog} videoId={videoId} />
    </div>
  );
}

export default VideoList;

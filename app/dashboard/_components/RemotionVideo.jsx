"use client";
import React from "react";
import { AbsoluteFill, Img, Sequence, useVideoConfig } from "remotion";

function RemotionVideo({ script, imageList, audioFileUrl, captions }) {
  const { fps } = useVideoConfig();

  const getDurationFrame = () => {
    return (captions[captions.length - 1].end / 1000) * fps;
  };
  return (
    <AbsoluteFill className="bg-black">
      {imageList?.map((image, index) => (
        <Sequence
          key={index}
          from={(index * getDurationFrame()) / imageList.length}
          durationInFrames={getDurationFrame()}
        >
          <Img
            src={image}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
}

export default RemotionVideo;

"use client";
import React, { useContext } from "react";
import SelectTopic from "./_components/SelectTopic";
import { useState, useEffect } from "react";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import SelectStyle from "./_components/SelectStyle";
import { Video } from "lucide-react";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from "uuid";
import { VideoDataContext } from "@/app/_context/VideoDataContext";
import { Users, VideoData } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import PlayerDialog from "../_components/PlayerDialog";
import { db } from "@/configs/db";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

function CreateNew() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const { videoData, setVideoData } = useContext(VideoDataContext);
  const { user } = useUser();
  const [playVideo, setPlayVideo] = useState(false);
  const [videoId, setVideoId] = useState(4);
  const { userDetails, setUserDetails } = useContext(UserDetailContext);

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onCreateClickHandler = async () => {
    if (userDetails?.credits <= 0) {
      toast("Credit limit reached");
      return;
    }
    setLoading(true);

    await GetVideoScript();

    setLoading(false);
  };

  const GetVideoScript = async () => {
    const prompt = `Write a script to generate ${formData.duration} video on topic :${formData.topic} along with AI image prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with imagePrompt and ContentText as field`;

    const result = await axios
      .post("/api/get-video-script", {
        prompt: prompt,
      })
      .then(async (response) => {
        setVideoData((prev) => ({
          ...prev,
          videoScript: response.data.result,
        }));
        setVideoScript(response.data.result);
        await GenerateAudioFile(response.data.result);
      });
  };

  const GenerateAudioFile = async (videoScriptData) => {
    let script = "";
    const id = uuidv4();
    videoScriptData.forEach((item) => {
      script = script + item.ContentText + " ";
    });

    await axios
      .post("/api/generate-audio", { text: script, id })
      .then(async (response) => {
        setVideoData((prev) => ({
          ...prev,
          audioFileUrl: response.data.result,
        }));
        await GenerateAudioCaption(response.data.result, videoScriptData);
      });
  };

  const GenerateAudioCaption = async (audioFileUrl, videoScriptData) => {
    await axios
      .post("/api/generate-caption", { audioFileUrl })
      .then(async (response) => {
        setVideoData((prev) => ({
          ...prev,
          captions: response.data.result,
        }));
        await GenerateImage(videoScriptData);
      });
  };

  const GenerateImage = async (videoScript) => {
    let images = [];

    try {
      for (const script of videoScript) {
        const response = await axios.post("/api/generate-image", {
          prompt: script?.imagePrompt,
        });
        images.push(response.data.result);
      }

      setVideoData((prev) => ({
        ...prev,
        imageList: images,
      }));
    } catch (error) {
      console.error("Error generating images:", error);
    }
  };

  const SaveVideoData = async (videoData) => {
    setLoading(true);

    try {
      const result = await db
        .insert(VideoData)
        .values({
          script: videoData.videoScript,
          audioFileUrl: videoData.audioFileUrl,
          captions: videoData.captions,
          imageList: videoData.imageList,
          createdBy: user.primaryEmailAddress.emailAddress,
        })
        .returning({ id: VideoData.id });
        
      await UpdateUserCredits();
      setVideoId(result[0].id);
      setPlayVideo(true);
      console.log(result);
    } catch (err) {
      console.error("Error inserting video data:", err);
    } finally {
      setLoading(false);
    }
  };
  const UpdateUserCredits = async () => {
    const result = await db
      .update(Users)
      .set({
        credits: userDetails?.credits - 10,
      })
      .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));
      console.log(result)
      setUserDetails(prev=>({
        ...prev,
        "credits" : userDetails?.credits - 10
      }))
  };

  useEffect(() => {
    console.log(videoData);
    if (videoData && Object.keys(videoData).length === 4) {
      SaveVideoData(videoData);
    }
  }, [videoData]);

  return (
    <div className="md:px-10 lg:px-20">
      <h2 className="font-bold text-4xl text-primary text-center mt-5">
        Create New
      </h2>

      <div className="mt-7 p-10 shadow-md rounded-md">
        <SelectTopic onUserSelect={onHandleInputChange} />

        <SelectStyle onUserSelect={onHandleInputChange} />

        <SelectDuration onUserSelect={onHandleInputChange} />

        <Button className={"w-full mt-10"} onClick={onCreateClickHandler}>
          Create Video <Video />
        </Button>
      </div>
      <CustomLoading loading={loading} />
      <PlayerDialog playVideo={playVideo} videoId={videoId} />
    </div>
  );
}

export default CreateNew;

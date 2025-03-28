"use client";
import React from "react";
import SelectTopic from "./_components/SelectTopic";
import { useState } from "react";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import SelectStyle from "./_components/SelectStyle";
import { Video } from "lucide-react";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from 'uuid';

const scriptData = "It was a dark and stormy night... ...and I found an abandoned cabin. Curiosity got the better of me. Something was watching me. I ran! Never going back! "
const audioFileUrl = "https://firebasestorage.googleapis.com/v0/b/video-ai-agent-83043.firebasestorage.app/o/ai-video-files%2Fb69d302e-06bd-4666-9e03-29e75bb173b3.mp3?alt=media&token=683a8990-c1d9-4771-9ef0-01c645e7f8f4"

function CreateNew() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [videoScript, setVideoScript] = useState();
  // const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState([]);

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onCreateClickHandler = async () => {
    setLoading(true);
    await GenerateAudioCaption(audioFileUrl);
    setLoading(false);
  };

  // const GetVideoScript = async () => {
  //   const prompt = `Write a script to generate ${formData.duration} video on topic :${formData.topic} along with AI image prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with imagePrompt and ContentText as field`;

  //   const result = await axios
  //     .post("/api/get-video-script", {
  //       prompt: prompt,
  //     })
  //     .then((response) => {
  //       setVideoScript(response.data.result);
  //       GenerateAudioFile(response.data.result);
  //     });
  // };

  // const GenerateAudioFile = async(videoScriptData)=>{

  //   // let script = '';
  //   const id = uuidv4();
  //   // videoScriptData.forEach((item) => {
  //   //   script = script + item.ContentText+ ' '
  //   // })

  //   await axios.post("/api/generate-audio", {text: videoScriptData, id}).then((response) => {
  //     setAudioFileUrl(response.data.result);
  //   })
  // }

  const GenerateAudioCaption = async (audioFileUrl) => {
    await axios.post("/api/generate-caption", { audioFileUrl }).then((response) => {

      setCaptions(response?.data?.result)
    });
  }

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
    </div>
  );
}

export default CreateNew;

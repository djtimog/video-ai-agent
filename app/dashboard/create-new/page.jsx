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
function CreateNew() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onCreateClickHandler = async () => {
    setLoading(true);
    await GetVideoScript();
    setLoading(false);
  };

  const GetVideoScript = async () => {
    const prompt = `Write a script to generate ${formData.duration} video on topic :${formData.topic} along with AI image prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with imagePrompt and ContentText as field`;

    const result = await axios
      .post("/api/getVideoScript", {
        prompt: prompt,
      })
      .then((response) => {
        console.log(response.data);
        setVideoScript(response.data);
      });
  };

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

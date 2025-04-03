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

function CreateNew() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const { videoData, setVideoData } = useContext(VideoDataContext);

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
        await GenerateAudioCaption(response.data.result);
      });
  };

  const GenerateAudioCaption = async (audioFileUrl) => {
    await axios
      .post("/api/generate-caption", { audioFileUrl })
      .then(async (response) => {
        setVideoData((prev) => ({
          ...prev,
          captions: response.data.result,
        }));
        await GenerateImage();
      });
  };

  const GenerateImage = async () => {
    let images = [];

    videoScript.forEach(async (script) => {
      await axios
        .post("/api/generate-image", { prompt: script?.imagePrompt })
        .then((resp) => {
          images.push(resp.data.result);
        });
    });

    console.log(images);
    await setVideoData((prev) => ({
      ...prev,
      imageList: images,
    }));
  };

  useEffect(() => {
    console.log(videoData);
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
    </div>
  );
}

export default CreateNew;

// const scriptData =
//   "It was a dark and stormy night... ...and I found an abandoned cabin. Curiosity got the better of me. Something was watching me. I ran! Never going back! ";
// const audioFileUrl =
//   "https://firebasestorage.googleapis.com/v0/b/video-ai-agent-83043.firebasestorage.app/o/ai-video-files%2Fb69d302e-06bd-4666-9e03-29e75bb173b3.mp3?alt=media&token=683a8990-c1d9-4771-9ef0-01c645e7f8f4";

//   const videoScript=[
//   {
//     "imagePrompt": "GTA V loading screen style, nighttime, lonely desert highway, vintage muscle car dashboard view, low fuel gauge glowing red, dashboard lights illuminating driver's tense hands on the wheel, cinematic lighting, desolate atmosphere, ultra detailed.",
//     "contentText": "(Sound of car engine humming, faint static radio) Late night. Miles from anywhere. The needle hits empty... just my luck."
//   },
//   // {
//   //   "imagePrompt": "GTA V style illustration, wide angle shot, isolated, run-down gas station at night off a desert highway, flickering neon sign 'GAS', one pump lit eerily, deep shadows, spooky, mist creeping in, detailed environment, cinematic night lighting.",
//   //   "contentText": "(Sound of engine sputtering, tires on gravel) Only lights for miles belong to this place. Looked like it hadn't seen a customer since the tumbleweeds took over."
//   // },
//   // {
//   //   "imagePrompt": "GTA V style, low angle shot from behind a character (generic male, leather jacket, jeans) walking towards the brightly lit but empty-looking convenience store attached to the gas station, door slightly ajar, unsettling silence, high detail, ominous.",
//   //   "contentText": "(Sound of wind whistling softly, footsteps on gravel) Wind howled, but it felt... quiet. Too quiet. No attendant. Door creaked open invitingly... or maybe warningly."
//   // },
//   // {
//   //   "imagePrompt": "GTA V style, interior of a dusty, abandoned convenience store, flickering fluorescent lights casting long shadows, empty shelves, overturned display rack, single security monitor on the counter showing pure static, POV shot, unsettling atmosphere, horror elements.",
//   //   "contentText": "(Sound of buzzing fluorescent light, faint creaking) Inside felt colder. Dust thick in the air. Looked like everyone vanished mid-shift. That monitor... just static. Or was something moving in it?"
//   // },
//   // {
//   //   "imagePrompt": "GTA V style, dramatic close-up from behind the counter, a shadowy, gaunt figure with glowing white eyes and an unnaturally wide, jagged smile slowly rising into view, looking directly at the viewer, intense horror, dark, grimy details, shallow depth of field.",
//   //   "contentText": "(Sudden sharp inhale sound, buzzing intensifies then cuts) A floorboard creaked behind the counter. Not empty. Not empty at all. That... smile... it wasn't human."
//   // },
//   // {
//   //   "imagePrompt": "GTA V style action shot, vintage muscle car speeding away frantically from the gas station at night, taillights leaving bright red streaks, tires kicking up dirt, gas station receding ominously in the background, dynamic low angle tracking shot, sense of panic and escape, motion blur.",
//   //   "contentText": "(Sound of frantic footsteps, car door slam, engine revving violently, tires squealing) Didn't think. Just ran. Floored it. Didn't dare look in the rearview mirror. Some places... you don't stop for gas."
//   // }
// ]

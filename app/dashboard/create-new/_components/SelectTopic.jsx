"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

function SelectTopic({ onUserSelect }) {
  const options = [
    "Custom Prompt",
    "Random AI Story",
    "Scary Story",
    "Historical Facts",
    "Funny Story",
    "Motivational",
    "AI Story",
    "Fun Facts",
  ];
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div>
      <h2 className="font-bold text-2xl text-primary">Content</h2>
      <p className="text-gray-500 mt-2">What is the topic of your video</p>
      <Select
        onValueChange={(value) => {
          setSelectedOption(value);
          value != "Custom Prompt" && onUserSelect("topic", value);
        }}
        className="bg-inherit"
      >
        <SelectTrigger className="w-full mt-5 p-6 text-lg">
          <SelectValue placeholder="Content Type" />
        </SelectTrigger>
        <SelectContent className="select-dropdown">
          {options.map((option, index) => (
            <SelectItem className="select-option" key={index} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedOption === "Custom Prompt" && (
        <Textarea
          className="mt-3"
          onChange={(e) => {
            onUserSelect("topic", e.target.value);
          }}
          placeholder="Write prompt on which you want to generate video"
        />
      )}
    </div>
  );
}

export default SelectTopic;

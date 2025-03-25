"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SelectDuration({ onUserSelect }) {
    
  return (
    <div className="mt-7">
      <h2 className="font-bold text-2xl text-primary">Duration</h2>
      <p className="text-gray-500 mt-2">Select duration of your video</p>
      <Select
        onValueChange={(value) => onUserSelect("duration", value)}
        className="bg-inherit"
      >
        <SelectTrigger className="w-full mt-5 p-6 text-lg">
          <SelectValue placeholder="Select duration" />
        </SelectTrigger>
        <SelectContent className="select-dropdown">
          <SelectItem value="15 Seconds" className="select-option">15 Seconds</SelectItem>
          <SelectItem value="30 Seconds" className="select-option">30 Seconds</SelectItem>
          <SelectItem value="45 Seconds" className="select-option">45 Seconds</SelectItem>
          <SelectItem value="60 Seconds" className="select-option">60 Seconds</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectDuration;

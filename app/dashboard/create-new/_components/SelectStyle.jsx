"use client";
import Image from "next/image";
import React, { useState } from "react";

function SelectStyle({ onUserSelect }) {
  const styleOptions = [
    {
      name: "Realstic",
      image: "/real.webp",
    },
    {
      name: "Cartoon",
      image: "/cartoon.jpg",
    },
    {
      name: "Comic",
      image: "/comic.webp",
    },
    {
      name: "WaterColor",
      image: "/watercolor.avif",
    },
    {
      name: "Gta",
      image: "/gta.jpg",
    },
  ];

  const [selectedStyle, setSelectedStyle] = useState();

  return (
    <div className="mt-7">
      <h2 className="font-bold text-2xl text-primary">Style</h2>
      <p className="text-gray-500 mt-2">Select your video style</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-5">
        {styleOptions.map((style, index) => (
          <div
            key={index}
            className={`relative hover:scale-105 transition-all cursor-pointer rounded-xl ${
              selectedStyle === style.name && "border-4 border-primary"
            }`}
          >
            <Image
              src={style.image}
              alt={style.name}
              width={100}
              height={100}
              className="h-48 object-cover rounded-lg w-full"
              onClick={() => {
                setSelectedStyle(style.name);
                onUserSelect("imageStyle", style.name);
              }}
            />
            <h2 className="w-full absolute p-1 bg-black bottom-0 text-white text-center rounded-b-lg">
              {style.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectStyle;

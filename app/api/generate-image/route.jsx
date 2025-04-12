import { storage } from "@/configs/FirebaseConfig";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("width", "1024");
    formData.append("height", "1024");
    formData.append("steps", "50");

    const response = await fetch(
      "https://api.stability.ai/v2beta/stable-image/generate/ultra",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
          Accept: "application/json",
        },
        body: formData,
      }
    );
    const data = await response.json();

    const base64Image = "data:image/png;base64," + data.image;
    const fileName = "ai-video-files/" + Date.now() + ".png";
    const storageRef = ref(storage, fileName);

    await uploadString(storageRef, base64Image, "data_url");

    const downloadUrl = await getDownloadURL(storageRef);

    return NextResponse.json({ result: downloadUrl });
  } catch (e) {
    return NextResponse.json({ error: e.message });
  }
}

// const byteCharacters = atob(base64String);

// // Create a new Uint8Array and store the binary data in it
// const byteArrays = [];

// for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
//   const slice = byteCharacters.slice(offset, offset + 1024);
//   const byteNumbers = new Array(slice.length);
//   for (let i = 0; i < slice.length; i++) {
//     byteNumbers[i] = slice.charCodeAt(i);
//   }
//   byteArrays.push(new Uint8Array(byteNumbers));
// }

// // Create a Blob from the binary data
// const blob = new Blob(byteArrays, { type: "application/octet-stream" });

// // Create a link to download the Blob as a file
// const fileName = "newfile.png"; // Change the filename here
// const link = document.createElement("a");
// link.href = URL.createObjectURL(blob);
// link.download = fileName;

// // Trigger a click event to download the file
// link.click();

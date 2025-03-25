const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const fs = require("node:fs");
const mime = require("mime-types");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseModalities: [],
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'Write a script to generate 30 seconds video on topic :Interesting historical story along with AI image prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and ContentText as field" what about this?',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: 'Okay, I can provide a JSON structure with 30 seconds worth of content for a historical story, broken down into short scenes with associated realistic AI image prompts.  I\'ll structure the JSON as you requested: `imagePrompt` and `ContentText`.\n\nSince 30 seconds is short, I\'ll choose a brief but interesting historical anecdote – let\'s go with the story of the "Radium Girls" and the tragic consequences of their work. This allows for a quick visual narrative.\n\nHere\'s the JSON structure you asked for:\n\n```json\n[\n  {\n    "imagePrompt": "Close-up of a young woman in the 1920s, wearing a factory uniform, meticulously painting numbers onto a watch dial with a fine brush. The dial glows faintly green. Realistic, warm lighting, vintage style.",\n    "ContentText": "1920s: Young women were hired to paint watch dials with radium paint, prized for its glow."\n  },\n  {\n    "imagePrompt": "A group of \'Radium Girls\' laughing and chatting in a factory break room. They are covered in glowing radium dust. Realistic, period clothing and hairstyles.",\n    "ContentText": "They were told the paint was harmless, encouraged to \'point\' their brushes with their lips."\n  },\n  {\n    "imagePrompt": "X-ray image showing a woman\'s jawbone disintegrating, surrounded by healthy bone. High detail, medical illustration style, realistic.",\n    "ContentText": "Years later, they suffered gruesome illnesses, their bones decaying."\n  },\n  {\n    "imagePrompt": "A courtroom scene in the 1930s. A group of sickly women, the \'Radium Girls\', are facing a panel of stern-looking businessmen in suits. Realistic, dramatic lighting.",\n    "ContentText": "They fought for justice, their case a landmark in labor rights."\n  },\n  {\n    "imagePrompt": "A somber monument or memorial dedicated to the \'Radium Girls.\' Flowers are laid at its base. Realistic, natural lighting, focus on the stone and flowers.",\n    "ContentText": "Their sacrifice led to safer working conditions. Remember their story."\n  }\n]\n```\n\n**Explanation and Considerations:**\n\n*   **JSON Structure:**  The code is in valid JSON format, an array of objects. Each object has the `imagePrompt` and `ContentText` fields.\n*   **Scene Breakdown:** I\'ve divided the story into 5 short scenes, aiming for roughly 6 seconds per scene, which translates well for short-form video on platforms like TikTok or YouTube Shorts.\n*   **Realistic Image Prompts:**  I\'ve tried to write very detailed, specific prompts designed to elicit realistic images from AI image generators. The prompts emphasize realism, period details, and appropriate lighting.\n*   **Content Text:**  The `ContentText` is concise and suitable for on-screen text in a video. The text should be short enough to read quickly within the allotted time.\n*   **Pacing:** The story is paced to deliver a brief but impactful message.\n*   **AI Image Generator Notes:**\n    *   These prompts should work reasonably well with AI image generators like Midjourney, DALL-E 3, Stable Diffusion, or others.\n    *   You may need to experiment with the prompts, adjusting keywords, and adding parameters to get the exact look you want.\n    *   Be mindful of the specific capabilities and limitations of your chosen AI image generator.\n*   **Customization:**  Feel free to adapt the story, prompts, and text to your preferences. You could focus on different aspects of the story or choose a different historical event altogether.\n\n**How to Use This:**\n\n1.  **Copy the JSON:** Copy the JSON code block.\n2.  **Save as a File:** Save the JSON as a `.json` file (e.g., `radium_girls.json`).\n3.  **Use with a Video Editor:** You\'ll need a video editor (e.g., Adobe Premiere Pro, Final Cut Pro, DaVinci Resolve, or even mobile video editing apps).\n4.  **Generate Images:** Use the `imagePrompt` from each JSON entry to generate an image with your AI tool.\n5.  **Assemble the Video:**  Import the generated images into your video editor. Add the `ContentText` as on-screen text for each scene.  Add transitions, music, and sound effects to create a complete 30-second video.\n\nThis framework gives you the key components needed to create your historical video.  Good luck!\n',
        },
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// // TODO: Following code needs to be updated for client-side apps.
// const candidates = result.response.candidates;
// for(let candidate_index = 0; candidate_index < candidates.length; candidate_index++) {
//   for(let part_index = 0; part_index < candidates[candidate_index].content.parts.length; part_index++) {
//     const part = candidates[candidate_index].content.parts[part_index];
//     if(part.inlineData) {
//       try {
//         const filename = `output_${candidate_index}_${part_index}.${mime.extension(part.inlineData.mimeType)}`;
//         fs.writeFileSync(filename, Buffer.from(part.inlineData.data, 'base64'));
//         console.log(`Output written to: ${filename}`);
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   }
// }

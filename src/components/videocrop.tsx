import { Player } from "@remotion/player";
import { useCallback, useState } from "react";

// Define or import MyComposition properly
const MyComposition: React.FC<{ videoUrl: string | null }> = () => {
  // Implementation of MyComposition
  return null;
};

type VideoState =
  | {
      type: "empty";
    }
  | {
      type: "blob" | "cloud";
      url: string;
    };

export const RemotionPlayer: React.FC = () => {
  const [videoState, setVideoState] = useState<VideoState>({
    type: "empty",
  });

  const handleChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files === null) {
        return;
      }
      const file = event.target.files[0];
      const blobUrl = URL.createObjectURL(file);
      setVideoState({ type: "blob", url: blobUrl });
     
      const cloudUrl = await upload(file);
      setVideoState({ type: "cloud", url: cloudUrl });
      URL.revokeObjectURL(blobUrl);
      console.log(blobUrl);
    },
    []
  );

  return (
    <div>
      {videoState.type !== "empty" ? (
        <Player
          component={MyComposition}
          durationInFrames={120}
          compositionWidth={1920}
          compositionHeight={1080}
          fps={30}
          inputProps={{ videoUrl: videoState.url }}
        />
      ) : null}
      <input type="file" onChange={handleChange} /> hello
    </div>
  );
};

// Implement upload function to actually upload the file and return the cloud URL
async function upload(file: File): Promise<string> {
  // Your implementation of file upload here
  return "cloudUrl"; // Dummy return for demonstration
}

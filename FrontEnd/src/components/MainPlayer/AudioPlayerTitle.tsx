import { useStore } from "@/context/StoreContext";
import { useTheme } from "@/context/ThemeProvider";
import { themes } from "@/lib/themes";
import React from "react";

const AudioPlayerTitle = () => {
  const { isPlaying, selectedSong } = useStore();
  const { theme } = useTheme();

  if (isPlaying) {
    return (
      <div className="overflow-hidden whitespace-nowrap w-[500px] h-3">
        <div className="animate-marquee flex h-full w-[450px] justify-between items-center">
          <p className="h-full">
            {selectedSong?.title ||
              "ORLENIS 22K - Amiga Mia (Prod. by ERNESTO LOSA)"}
          </p>
          <p className={`text-center p-0 ${themes[theme].artist}`}>
            {selectedSong?.artist || "Artista desconocido"}
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex w-full justify-between ">
      <p className="w-max h-full ">
        {selectedSong
          ? selectedSong?.title
          : "ORLENIS 22K - Amiga Mia (Prod. by ERNESTO LOSA)"}
      </p>
      <p className={` text-center p-0 ${themes[theme].artist}`}>
        {selectedSong ? selectedSong?.artist : "Artista desconocido"}
      </p>
    </div>
  );
};

export default AudioPlayerTitle;

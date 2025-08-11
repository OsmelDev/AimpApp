import { Theme } from "@/context/ThemeProvider";
import { themes } from "@/lib/themes";
import { Song } from "@/types/types";
import React, { FC } from "react";
import AudioPlayerTitle from "./AudioPlayerTitle";
import ControlPanel from "./ControlPanel";

interface AudioPlayerCompactProps {
  handlePrevSong: () => void;
  handleNextSong: () => void;
}

const AudioPlayerCompact: FC<AudioPlayerCompactProps> = ({
  handlePrevSong,
  handleNextSong,
}) => {
  return (
    <div className="flex flex-col items-center text-[10px] max-h-20 h-10 py-1 w-full  ">
      <div className=" flex px-1 h-full min-w-full justify-between items-center">
        <AudioPlayerTitle />
      </div>

      <ControlPanel
        handleNextSong={handleNextSong}
        handlePrevSong={handlePrevSong}
      />
    </div>
  );
};

export default AudioPlayerCompact;

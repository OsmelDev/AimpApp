import React, { FC } from "react";
import { themes } from "@/lib/themes";
import { useTheme } from "@/context/ThemeProvider";
import {
  Pause,
  Play,
  Repeat,
  StepBack,
  StepForward,
  Shuffle,
  Volume,
  Volume1,
  Volume2,
} from "lucide-react";
import useAudioPlayer from "@/hooks/useAudioPlayer";
import { useStore } from "@/context/StoreContext";

interface ControlPanelProps {
  handlePrevSong: () => void;
  handleNextSong: () => void;
}

const ControlPanel: FC<ControlPanelProps> = ({
  handlePrevSong,
  handleNextSong,
}) => {
  const {
    handlePlay,
    duration,
    currentTime,
    handleSeek,
    formatTime,
    volume,
    handleVolumeChange,
  } = useAudioPlayer();
  const { isPlaying } = useStore();
  const { theme } = useTheme();
  return (
    <div className=" flex items-center justify-between px-2 w-full">
      <div className="flex items-center justify-center  space-x-2 md:space-x-1">
        <button className={`${themes[theme].icon} hover:text-white`}>
          <Shuffle size={10} />
        </button>
        <button
          className={`${themes[theme].icon} hover:text-white`}
          onClick={handlePrevSong}
        >
          <StepBack size={10} />
        </button>
        <button
          className={`${themes[theme].icon} hover:text-white cursor-pointer`}
          onClick={handlePlay}
        >
          {!isPlaying ? <Play size={10} /> : <Pause size={10} />}
        </button>
        <button
          className={`${themes[theme].icon} hover:text-white`}
          onClick={handleNextSong}
        >
          <StepForward size={10} />
        </button>
        <button className={`${themes[theme].icon} hover:text-white`}>
          <Repeat size={10} />
        </button>
      </div>
      <div className="px-2">
        <div
          className={`flex gap-2 items-center justify-center text-xs ${themes[theme].artist} `}
        >
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-[3rem] h-[2px] bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex gap-1">
            <span className="text-[8px]">{formatTime(currentTime)} /</span>
            <span className="text-[8px]">{formatTime(duration)}</span>
          </div>
        </div>
      </div>
      <div
        className="flex justify-center items-center 
              md:flex-row md:justify-center md:items-center md:space-x-2  "
      >
        {volume === 0 ? (
          <Volume size={14} className={`${themes[theme].icon}`} />
        ) : volume === 50 || volume <= 50 || volume <= 99 ? (
          <Volume1 size={14} className={`${themes[theme].icon}`} />
        ) : (
          volume === 100 && (
            <Volume2 size={14} className={`${themes[theme].icon}`} />
          )
        )}
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className=" md:m-0 w-10 h-[2px] bg-gray-600 rounded-lg appearance-none cursor-pointer "
        />
      </div>
    </div>
  );
};

export default ControlPanel;

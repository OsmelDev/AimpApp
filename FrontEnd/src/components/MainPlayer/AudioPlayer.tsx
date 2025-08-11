import { useStore } from "@/context/StoreContext";
import { useTheme } from "@/context/ThemeProvider";
import useAudioPlayer from "@/hooks/useAudioPlayer";
import { themes } from "@/lib/themes";
import { Volume, Volume1, Volume2 } from "lucide-react";
import React, { FC } from "react";
import {
  FaPause,
  FaPlay,
  FaRandom,
  FaRedo,
  FaStepBackward,
  FaStepForward,
} from "react-icons/fa";

interface AudioPlayerProps {
  handlePrevSong: () => void;
  handleNextSong: () => void;
}

const AudioPlayer: FC<AudioPlayerProps> = ({
  handlePrevSong,
  handleNextSong,
}) => {
  const {
    handlePlay,
    handleVolumeChange,
    volume,
    formatTime,
    currentTime,
    handleSeek,
    duration,
  } = useAudioPlayer();
  const { isPlaying, selectedSong } = useStore();
  const { theme } = useTheme();

  const getVolIcon = (volume: number) => {
    const iconProps = { size: 18, className: themes[theme].icon };

    if (volume === 0) return <Volume {...iconProps} />;
    if (volume === 100) return <Volume2 {...iconProps} />;

    return <Volume1 {...iconProps} />;
  };

  return (
    <div className="flex flex-col max-w-full h-full">
      <div
        className={`max-h-50 p-4 ${themes[theme].coverImage} flex items-center justify-center  `}
      >
        <img
          src="/images/vinils.png"
          alt="vinil"
          className={`md:h-[100%] sm:h-[130%] ${
            isPlaying && "animation-image"
          } `}
        />
      </div>

      <div className={`p-4 ${themes[theme].border} border border-transparent`}>
        <div className="text-lg font-bold truncate">
          {selectedSong
            ? selectedSong?.title
            : "ORLENIS 22K - Amiga Mia (Prod. by ERNESTO LOSA)"}
        </div>
        <div className={`text-sm truncate ${themes[theme].artist}`}>
          {selectedSong ? selectedSong?.artist : "Artista desconocido"}
        </div>
      </div>

      <div className="px-4 pb-2">
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
        />

        <div
          className={`flex justify-between text-xs ${themes[theme].artist} mt-1`}
        >
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <div
        className="flex justify-center items-center 
              md:min-h-auto md:flex-row md:justify-center md:items-center md:space-x-3  "
      >
        {getVolIcon(volume)}
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className=" w-15 md:m-0 md:w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer "
        />
        <span className="text-[12px] text-center ml-2 ">{volume}</span>
      </div>

      <div className="px-6 py-4 md:p-4 flex items-center justify-between mb-6.1">
        <div className="flex items-center space-x-4 md:space-x-4 ">
          <button className={`${themes[theme].icon} hover:text-white`}>
            <FaRandom className="text-[14px] md:text-[18px]" />
          </button>
        </div>

        <div className="flex items-center space-x-2 md:space-x-6">
          <button
            className={`${themes[theme].icon} hover:text-white`}
            onClick={handlePrevSong}
          >
            <FaStepBackward className="text-[15px] md:text-[20px]" />
          </button>
          <button
            className="text-white bg-blue-600 rounded-full p-2 hover:bg-blue-700"
            onClick={handlePlay}
          >
            {!isPlaying ? (
              <FaPlay className="text-[15px] md:text-[20px]" />
            ) : (
              <FaPause className="text-[15px] md:text-[20px]" />
            )}
          </button>
          <button
            className={`${themes[theme].icon} hover:text-white`}
            onClick={handleNextSong}
          >
            <FaStepForward className="text-[15px] md:text-[20px]" />
          </button>
        </div>
        <div className="flex items-center space-x-4 md:space-x-4 ">
          <button className={`${themes[theme].icon} hover:text-white`}>
            <FaRedo className="text-[14px] md:text-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;

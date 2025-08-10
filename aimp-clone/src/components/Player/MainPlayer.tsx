"use client";
import { FC, useState } from "react";
import useAudioPlayer from "@/hooks/useAudioPlayer";
import PlayerHeader from "../MainPlayer/Header";
import { useTheme } from "@/context/ThemeProvider";
import { themes } from "@/lib/themes";
import Footer from "../MainPlayer/Footer";
import AudioPlayer from "../MainPlayer/AudioPlayer";
import AudioPlayerCompact from "../MainPlayer/AudioPlayerCompact";
import { useStore } from "@/context/StoreContext";

interface MusicPlayerProps {
  handleOpenPlayerlist: () => void;
  handleOpenEqualizer: () => void;
}

const MainPlayer: FC<MusicPlayerProps> = ({
  handleOpenPlayerlist,
  handleOpenEqualizer,
}) => {
  const { handleTimeUpdate, setSongIndex, songIndex } = useAudioPlayer();
  const [isCompact, setIsCompact] = useState(true);
  const { theme } = useTheme();
  const { setIsPlaying, songs, audioRef, handleSongSelect, setActiveSong } =
    useStore();

  const handleNextSong = () => {
    const nextIndex = songIndex >= songs.length - 1 ? 0 : songIndex + 1;
    setActiveSong(songs[nextIndex].id);
    handleSongSelect(songs[nextIndex]);
    setSongIndex(nextIndex);
    setIsPlaying(true);
  };

  const handlePrevSong = () => {
    const prevIndex = songIndex === 0 ? songs.length - 1 : songIndex - 1;
    setActiveSong(songs[prevIndex].id);
    handleSongSelect(songs[prevIndex]);
    setSongIndex(prevIndex);
    setIsPlaying(true);
  };

  return (
    <div
      className={`w-full ${
        isCompact ? "h-full justify-between" : "md:h-[6.5rem] h-[6.3rem] "
      } ${themes[theme].player} 
      m-0 flex flex-col 
      transition-discrete duration-500 ease-in-out
      font-sans rounded-lg overflow-hidden shadow-xl`}
    >
      <PlayerHeader setIsCompact={setIsCompact} isCompact={isCompact} />

      {isCompact ? (
        <AudioPlayer
          handlePrevSong={handlePrevSong}
          handleNextSong={handleNextSong}
        />
      ) : (
        <AudioPlayerCompact
          handlePrevSong={handlePrevSong}
          handleNextSong={handleNextSong}
        />
      )}
      <Footer
        theme={theme}
        handleOpenPlayerlist={handleOpenPlayerlist}
        handleOpenEqualizer={handleOpenEqualizer}
      />
      <audio
        ref={audioRef}
        src="/song/sample.mp3"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNextSong}
        className="border  w-96 h-20"
        hidden
      />
    </div>
  );
};

export default MainPlayer;

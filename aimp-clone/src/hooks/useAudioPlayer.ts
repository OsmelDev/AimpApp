import { useStore } from "@/context/StoreContext";
import { useState } from "react";

const useAudioPlayer = () => {
  const {
    setVolume,
    volume,
    isPlaying,
    setIsPlaying,
    audioRef,
    setActiveSong,
    songs,
    handleSongSelect,
    fileInputRef,
    activeSong,
    setSongs,
  } = useStore();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [songIndex, setSongIndex] = useState(0);

  const handlePlay = () => {
    if (!audioRef?.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Error al reproducir:", error);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);

    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }

    setCurrentTime(newTime);

    if (audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.error("Error al reanudar:", e));
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const handleStop = () => {
    if (audioRef!.current) {
      audioRef!.current.pause();
    }
    setIsPlaying(false);
  };

  const formatTime = (time: number) => {
    if (typeof time !== "number" || time < 0 || !Number.isFinite(time)) {
      return "0:00";
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSongClick = (id: string) => {
    const selectedSong = songs.find((song) => song.id === id);
    if (!selectedSong) {
      return;
    }

    setActiveSong(id);
    handleSongSelect(selectedSong);
  };

  const handleAddFiles = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveSelected = () => {
    if (activeSong) {
      setSongs(songs.filter((song) => song.id !== activeSong));
      setActiveSong(null);
    }
  };

  return {
    duration,
    currentTime,
    volume,
    songIndex,
    setSongIndex,
    setCurrentTime,
    setVolume,
    handlePlay,
    handleTimeUpdate,
    handleSeek,
    handleVolumeChange,
    handleStop,
    formatTime,
    handleSongClick,
    handleAddFiles,
    handleRemoveSelected,
  };
};

export default useAudioPlayer;

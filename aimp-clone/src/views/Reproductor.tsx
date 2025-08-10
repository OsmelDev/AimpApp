"use client";
import { useState } from "react";
import MainPlayer from "../components/Player/MainPlayer";
import Panel from "@/components/Player/Panel";

export default function Reproductor() {
  const [openPlaylist, setOpenPlaylist] = useState(false);
  const [openEqualizer, setOpenEqualizer] = useState(false);

  const handleOpenPlayerlist = () => {
    setOpenPlaylist(!openPlaylist);
    if (openEqualizer === true) {
      setOpenEqualizer(false);
    }
  };

  const handleOpenEqualizer = () => {
    setOpenEqualizer(!openEqualizer);
    if (openPlaylist === true) {
      setOpenPlaylist(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-t from-gray-900 to-gray-400 flex items-center justify-center p-1
     md:p-2"
    >
      <div className="w-[90%] md:w-[60%] grid grid-cols-1 gap-4 md:grid-cols-2  h-[80%]">
        <MainPlayer
          handleOpenPlayerlist={handleOpenPlayerlist}
          handleOpenEqualizer={handleOpenEqualizer}
        />

        <Panel
          openEqualizer={openEqualizer}
          openPlaylist={openPlaylist}
          handleOpenEqualizer={handleOpenEqualizer}
          handleOpenPlayerlist={handleOpenPlayerlist}
        />
      </div>
    </div>
  );
}

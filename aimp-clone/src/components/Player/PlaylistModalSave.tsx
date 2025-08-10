import { useTheme } from "@/context/ThemeProvider";
import { themes } from "@/lib/themes";
import React, { FC, useState } from "react";
import { FiSave } from "react-icons/fi";

interface PlaylistModalSaveProps {
  handleSavePlaylist: (name: string) => void;
}

const PlaylistModalSave: FC<PlaylistModalSaveProps> = ({
  handleSavePlaylist,
}) => {
  const [playlistName, setPlaylistName] = useState("");
  const { theme } = useTheme();
  return (
    <div
      className={`absolute top-7 right-5 ${themes[theme].header} w-[80%] flex justify-between p-1 rounded-sm border border-gray-400`}
    >
      <input
        type="text"
        name="name"
        id=""
        onChange={(e) => setPlaylistName(e.target.value)}
        placeholder="playlist name"
        className="w-[85%] placeholder:text-[14px] placeholder:font-mono"
      />
      <FiSave
        size={24}
        className={`${themes[theme].playlist.icon}`}
        onClick={() => {
          handleSavePlaylist(playlistName);
        }}
      />
    </div>
  );
};

export default PlaylistModalSave;

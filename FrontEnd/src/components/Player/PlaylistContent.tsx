import { Theme } from "@/context/ThemeProvider";
import { Song, themes } from "@/types/types";
import React, { FC } from "react";
import { FiMusic, FiPlus } from "react-icons/fi";

interface PlaylistContentProps {
  handleAddFiles: () => void;
  handleSongClick: (id: string) => void;
  activeSong: string | null;
  songs: Song[];
  themes: themes;
  theme: Theme;
}

const PlaylistContent: FC<PlaylistContentProps> = ({
  songs,
  handleAddFiles,
  activeSong,
  handleSongClick,
  themes,
  theme,
}) => {
  return (
    <div
      className={`${themes[theme].playlist.content} flex-1/2 overflow-y-auto max-h-full h-full justify-center `}
    >
      {songs.length === 0 ? (
        <div
          className={`${themes[theme].playlist.content} flex flex-col items-center justify-center h-74.5  text-gray-400 p-4 text-center`}
        >
          <FiMusic size={32} className="mb-2" />
          <p>No hay canciones en la lista</p>
          <button
            onClick={handleAddFiles}
            className={`mt-4  flex items-center ${themes[theme].playlist.text} cursor-pointer`}
          >
            <FiPlus className="mr-1" />
            Añadir archivos
          </button>
        </div>
      ) : (
        <ul className={` divide-y divide-gray-700`}>
          {songs.map((song) => {
            return (
              <li
                key={song.id}
                className={`p-2 cursor-pointer font-semibold ${
                  activeSong === song.id
                    ? themes[theme].playlist.selectedSong
                    : themes[theme].playlist.song
                }
            }`}
                onClick={() => {
                  handleSongClick(song.id);
                }}
              >
                <div className="text-sm font-extralight truncate">
                  {song.title}
                </div>

                <div
                  className={`flex justify-between text-xs ${themes[theme].playlist.songText}`}
                >
                  <span>{song.artist}</span>
                  <span>{song.duration}</span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default PlaylistContent;

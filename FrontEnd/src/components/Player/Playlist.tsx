"use client";

import { FC } from "react";
import {
  FiPlus,
  FiTrash2,
  FiSave,
  FiList,
  FiFilePlus,
  FiFileMinus,
} from "react-icons/fi";
import { MdPlaylistAdd } from "react-icons/md";
import PlaylistContent from "./PlaylistContent";
import PlaylistModalSave from "./PlaylistModalSave";
import { useTheme } from "@/context/ThemeProvider";
import { themes } from "@/lib/themes";
import { useStore } from "@/context/StoreContext";
import PlayListLoaded from "./PlayListLoaded";
import useAudioPlayer from "@/hooks/useAudioPlayer";

interface PlayListProps {
  handleOpenPlayerlist: () => void;
}

const Playlist: FC<PlayListProps> = ({ handleOpenPlayerlist }) => {
  const { theme } = useTheme();
  const {
    playList,
    handleSavePlaylist,
    handlePlayListSelected,
    isOpen,
    setIsOpen,
    setOpenList,
    openList,
    handleFileChange,
    fileInputRef,
    songs,
    activeSong,
  } = useStore();
  const { handleSongClick, handleAddFiles, handleRemoveSelected } =
    useAudioPlayer();

  return (
    <div
      className={`${themes[theme].playlist.baseBackground}  min-h-full h-full`}
    >
      <div
        className={`flex items-center h-[40px] cursor-pointer border-b
          p-2 text-sm font-bold ${themes[theme].header} ${themes[theme].borderB}`}
        onClick={handleOpenPlayerlist}
      >
        Playlist
      </div>
      <div className="p-2 w-full  h-[90%] ">
        <div className="relative w-full md:w-full max-h-[100%] min-h-full bg-gray-800 text-gray-200 flex flex-col justify-around">
          <div
            className={`${themes[theme].header} w-full p-1  border flex justify-between items-center border-b border-gray-700`}
          >
            <div className="text-[.6rem] w-[55%] text-center font-bold flex items-center justify-center">
              <FiList className="mr-2 mb-1 " size={14} />
              Lista de reproducción
            </div>
            <div className="flex gap-0.5 justify-center w-[45%]">
              <button
                className={`text-gray-400  ${themes[theme].playlist.hoverBotton} p-1 cursor-pointer`}
                title="Añadir archivos"
                disabled={playList.length === 0}
              >
                {openList ? (
                  <FiFileMinus onClick={() => setOpenList(false)} />
                ) : (
                  <FiFilePlus onClick={() => setOpenList(true)} />
                )}
              </button>
              <button
                onClick={handleAddFiles}
                className={`text-gray-400  ${themes[theme].playlist.hoverBotton} p-1 cursor-pointer `}
                title="Añadir archivos"
              >
                <FiPlus size={14} />
              </button>
              <button
                onClick={handleRemoveSelected}
                className={`text-gray-400 ${themes[theme].playlist.hoverBotton} p-1 cursor-pointer`}
                title="Eliminar seleccionados"
                disabled={!activeSong}
              >
                <FiTrash2 size={16} />
              </button>
              <button
                className={`text-gray-400 p-1  ${
                  songs.length != 0
                    ? `${themes[theme].playlist.hoverBotton} cursor-pointer`
                    : "cursor-not-allowed"
                } `}
                title="Guardar playlist"
                disabled={songs.length === 0}
                onClick={() => setIsOpen(!isOpen)}
              >
                <FiSave size={16} />
              </button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="audio/*"
              multiple
              className="hidden"
            />
          </div>
          <PlaylistContent
            songs={songs}
            handleAddFiles={handleAddFiles}
            activeSong={activeSong}
            handleSongClick={handleSongClick}
            themes={themes}
            theme={theme}
          />
          <div
            className={`${themes[theme].backgroundFooter} p-2 text-xs text-gray-400 `}
          >
            <div className="flex justify-between">
              <span
                className={`${
                  songs.length === 0 ? "" : "text-blue-400"
                } font-medium`}
              >
                {songs.length} pista{songs.length !== 1 ? "s" : ""}
              </span>
              <button
                onClick={handleAddFiles}
                className="flex items-center text-blue-400 hover:text-blue-300"
              >
                <MdPlaylistAdd className="mr-1" size={16} />
                Añadir archivos
              </button>
            </div>
          </div>
          {isOpen && (
            <PlaylistModalSave handleSavePlaylist={handleSavePlaylist} />
          )}
          {openList && (
            <PlayListLoaded
              handlePlayListSelected={handlePlayListSelected}
              playList={playList}
              setOpenList={setOpenList}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Playlist;

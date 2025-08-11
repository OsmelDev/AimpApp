import { useTheme } from "@/context/ThemeProvider";
import { item, PlayList, Song } from "@/types/types";
import React, { Dispatch, FC, SetStateAction } from "react";
import { themes } from "@/lib/themes";

interface PlayListLoadedProps {
  playList: PlayList[];
  handlePlayListSelected: (songs: item[] | Song[]) => Promise<void>;
  setOpenList: Dispatch<SetStateAction<boolean>>;
}

const PlayListLoaded: FC<PlayListLoadedProps> = ({
  playList,
  handlePlayListSelected,
  setOpenList,
}) => {
  const { theme } = useTheme();
  return (
    <ul
      className={`border divide-y divide-gray-700 border-gray-700 min-w-20 min-h-20 ${themes[theme].playlist.baseBackground} absolute top-7 right-[6rem] sm:right-[10rem] md:right-[5rem] lg:right-[6rem] p-1`}
    >
      {playList
        ? playList.map((list) => (
            <li
              key={list.id}
              onClick={() => {
                handlePlayListSelected(list.songs);
                setOpenList(false);
              }}
              className={`cursor-pointer ${themes[theme].playlist.song} p-1 rounded-sm text-xs`}
            >
              {list.name}
            </li>
          ))
        : ""}
    </ul>
  );
};

export default PlayListLoaded;

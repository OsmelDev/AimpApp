import React, { FC } from "react";
import Playlist from "./Playlist";
import Equalizer from "./Equalizer";
import { themes } from "@/lib/themes";
import { useTheme } from "@/context/ThemeProvider";

interface PanelProps {
  openPlaylist: boolean;
  handleOpenPlayerlist: () => void;
  handleOpenEqualizer: () => void;
  openEqualizer: boolean;
}

const Panel: FC<PanelProps> = ({
  handleOpenEqualizer,
  openEqualizer,
  openPlaylist,
  handleOpenPlayerlist,
}) => {
  const { theme } = useTheme();
  return (
    <div className="flex flex-col gap-4 md:px-2">
      <div
        className={` w-full md:w-full ${
          openPlaylist ? "h-[30.6rem]" : "h-[40px]  "
        } transition-all duration-500 ease-in-out  ${
          themes[theme].player
        } rounded-lg overflow-hidden shadow-xl `}
      >
        <Playlist handleOpenPlayerlist={handleOpenPlayerlist} />
      </div>
      <div
        hidden
        className={` w-full md:w-full ${
          openEqualizer ? "h-[27rem]" : "h-[40px] "
        } transition-all  ${
          themes[theme].player
        } rounded-lg overflow-hidden shadow-xl  duration-500 ease-in-out`}
      >
        <Equalizer handleOpenEqualizer={handleOpenEqualizer} />
      </div>
    </div>
  );
};

export default Panel;

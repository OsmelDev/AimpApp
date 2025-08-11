import { Theme } from "@/context/ThemeProvider";
import { themes } from "@/lib/themes";
import React, { FC } from "react";
import { MdEqualizer, MdPlaylistPlay } from "react-icons/md";

interface FooterProps {
  handleOpenPlayerlist: () => void;
  handleOpenEqualizer: () => void;
  theme: Theme;
}

const Footer: FC<FooterProps> = ({
  handleOpenPlayerlist,
  handleOpenEqualizer,
  theme,
}) => {
  return (
    <div
      className={`${themes[theme].backgroundFooter}  p-2 flex justify-between`}
    >
      <button
        className={`${themes[theme].bottonsFooter}`}
        onClick={handleOpenPlayerlist}
      >
        <MdPlaylistPlay size={20} />
      </button>
      <button
        className={`${themes[theme].bottonsFooter}`}
        onClick={handleOpenEqualizer}
      >
        <MdEqualizer size={20} />
      </button>
    </div>
  );
};

export default Footer;

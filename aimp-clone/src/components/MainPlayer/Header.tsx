import React, { Dispatch, FC, SetStateAction } from "react";
import { FaEllipsisH } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../UI/Dropdown-menu";

import { Button } from "../UI/Button";
import { Theme, useTheme } from "@/context/ThemeProvider";
import { skins, themes } from "@/lib/themes";
import { ArrowDownNarrowWideIcon, ArrowUpNarrowWideIcon } from "lucide-react";

interface PlayerHeaderProps {
  setIsCompact: Dispatch<SetStateAction<boolean>>;
  isCompact: boolean;
}

const PlayerHeader: FC<PlayerHeaderProps> = ({ setIsCompact, isCompact }) => {
  const { theme, handleToggleSkin } = useTheme();
  return (
    <div
      className={`${themes[theme].header} border-b ${themes[theme].borderB} px-2  flex justify-between items-center`}
    >
      <div className="text-sm font-bold">AIMP3</div>

      <div className="flex space-x-2 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => e.stopPropagation()}
              title="Cambiar skin"
            >
              <FaEllipsisH size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className={` ${themes[theme].dropdownd} w-[20px] -mt-1 z-30 border-gray-900/50  font-bold backdrop-blur-sm flex flex-col items-center mr-3`}
          >
            {skins.map((skin) => (
              <DropdownMenuItem
                className={`w-full ${themes[theme].dropdowndItems}`}
                onClick={() => handleToggleSkin(skin.value as Theme)}
                key={skin.value}
              >
                <span key={skin.option} className="text-xs text-center  w-full">
                  {skin.option}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {isCompact ? (
          <button onClick={() => setIsCompact(!isCompact)} title="Compactar">
            <ArrowUpNarrowWideIcon size={18} />
          </button>
        ) : (
          <button onClick={() => setIsCompact(!isCompact)} title="Descompactar">
            <ArrowDownNarrowWideIcon size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default PlayerHeader;

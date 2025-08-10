export const themes = {
  classic: {
    player: "bg-gray-800 text-gray-200",
    header: "bg-gray-900 text-gray-100",
    dropdownd: "bg-gray-800 text-gray-300",
    dropdowndItems: "hover:bg-gray-600/30 text-foreground",
    coverImage: "bg-gray-500",
    border: "",
    borderB: "border-b border-b-gray-800",
    artist: "text-gray-400",
    icon: "text-blue-400",
    backgroundFooter: "bg-gray-900 text-gray-100",
    bottonsFooter: "text-gray-400 hover:text-white ",
    playlist: {
      baseBackground: "bg-gray-800",
      content: "bg-gray-900 text-gray-200",
      text: "text-blue-400 hover:text-blue-300",
      song: "bg-gray-800 hover:bg-gray-900 text-gray-300 hover:text-gray-200",
      selectedSong:
        "bg-gray-900 text-gray-200 border border-l-gray-600 border-r-gray-600",
      songText: "text-gray-600 ",
      icon: "text-gray-500",
      hoverBotton: "hover:text-white",
    },
    equalizer: {
      content: "bg-gray-900 border border-t-0 border-gray-800 rounded-b-sm",
      text: "text-gray-400 ",
      hoverText: "hover:text-gray-300",
      bgSelect: "bg-gray-900",
    },
  },
  dark: {
    player: "bg-black text-gray-100",
    header: "bg-black text-gray-200",
    dropdownd: "bg-black text-gray-200",
    dropdowndItems: "hover:bg-gray-600/30 text-foreground",
    coverImage: "bg-gray-950",
    border: "border-t-gray-700",
    borderB: "border-b-gray-700",

    artist: "text-gray-200",
    icon: "text-blue-400",
    backgroundFooter:
      "bg-black text-gray-200 border border-transparent border-t-gray-700",
    bottonsFooter: "text-gray-200 hover:text-white ",
    playlist: {
      baseBackground: "bg-gray-950",
      content: "bg-gray-950 text-gray-200",
      text: "text-blue-400 hover:text-blue-300",
      song: "bg-gray-950 hover:bg-gray-900 text-gray-300 hover:text-gray-200",
      selectedSong: "bg-gray-900 text-gray-200 border-l border-l-gray-600 ",
      songText: "text-gray-600 ",
      icon: "text-gray-400",
      hoverBotton: "hover:text-white",
    },
    equalizer: {
      content: "bg-gray-950 border-t-0 border-gray-900",
      text: "text-gray-400 ",
      hoverText: "hover:text-gray-300",
      bgSelect: "bg-gray-950",
    },
  },
  light: {
    player: "bg-white text-gray-950",
    header: "bg-gray-100 text-gray-950",
    dropdownd: "bg-gray-200 text-gray-950",
    dropdowndItems: "hover:bg-gray-600/30 text-foreground",
    coverImage: "bg-gray-300",
    border: "border-t-gray-400",
    borderB: "border-b-gray-400",

    artist: "text-gray-800",
    icon: "text-blue-700",
    backgroundFooter:
      "bg-gray-100 text-gray-950 border border-transparent border-t-gray-700",
    bottonsFooter: "text-gray-900 hover:text-black ",
    playlist: {
      baseBackground: "bg-gray-200",
      content: "bg-gray-300 text-gray-950",
      text: "text-blue-600 hover:text-blue-400",
      song: "bg-gray-200 hover:bg-gray-400 text-gray-600 hover:text-gray-800",
      selectedSong: "bg-gray-300 text-gray-800",
      songText: "text-gray-600 ",
      icon: "text-gray-900",
      hoverBotton: "hover:text-blue-800",
    },
    equalizer: {
      content: "bg-gray-200 border border-t-0 border-gray-300 ",
      text: "text-gray-900 ",
      hoverText: "hover:text-gray-700",
      bgSelect: "bg-gray-200 ",
    },
  },
};

export const skins = [
  {
    option: "Classic",
    value: "classic",
  },
  {
    option: "Dark",
    value: "dark",
  },
  {
    option: "Light",
    value: "light",
  },
];

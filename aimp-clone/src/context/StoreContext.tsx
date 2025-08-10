"use client";
import { useToast } from "@/hooks/use-toast";
import { useActionsPlaylist } from "@/hooks/useActionsPlaylist";
import { playlistServices } from "@/services/services";
import { item, PlayList, Song } from "@/types/types";
import {
  ChangeEvent,
  createContext,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface ContextValues {
  songs: Song[];
  playList: PlayList[];
  currentFile: Song | undefined;
  selectedSong: Song | undefined;
  reload: boolean;
  isOpen: boolean;
  isPlaying: boolean;
  openList: boolean;
  activeSong: string | null;
  volume: number;
  fileInputRef: RefObject<HTMLInputElement | null>;
  audioContextRef: RefObject<AudioContext | null>;
  sourceNodeRef: RefObject<MediaElementAudioSourceNode | null>;
  audioRef: RefObject<HTMLAudioElement | null>;
  setPlayList: Dispatch<SetStateAction<PlayList[]>>;
  setReload: Dispatch<SetStateAction<boolean>>;
  setVolume: Dispatch<SetStateAction<number>>;
  setSongs: Dispatch<SetStateAction<Song[]>>;
  setActiveSong: Dispatch<SetStateAction<string | null>>;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  setCurrentFile: Dispatch<SetStateAction<Song | undefined>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setOpenList: Dispatch<SetStateAction<boolean>>;
  setSelectedSong: Dispatch<SetStateAction<Song | undefined>>;
  handleSavePlaylist: (name: string) => Promise<void>;
  handlePlayListSelected: (playListItems: item[] | Song[]) => Promise<void>;
  setupAudioContext: () => void;
  formatDuration: (seconds: number) => string;
  getAudioDuration: (file: File) => Promise<number>;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleSongSelect: (song: Song) => void;
}

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreContext = createContext<ContextValues | null>(null);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within an StoreProvider");
  }
  return context;
};

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [playList, setPlayList] = useState<PlayList[]>([]);
  const [reload, setReload] = useState(false);
  const { loadService } = playlistServices();
  const [volume, setVolume] = useState(25);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSong, setActiveSong] = useState<string | null>(null);
  const [currentFile, setCurrentFile] = useState<Song>();
  const [isOpen, setIsOpen] = useState(false);
  const [openList, setOpenList] = useState(false);
  const { savePlaylist } = useActionsPlaylist();
  const { toast } = useToast();
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedSong, setSelectedSong] = useState<Song>();

  const handleSongSelect = (song: Song) => {
    setCurrentFile(song);
    setSelectedSong(song);
  };

  useEffect(() => {
    const loadPlayList = async () => {
      const { data } = await loadService();
      setPlayList(data);
    };
    loadPlayList();
  }, [reload]);

  useEffect(() => {
    if (audioRef?.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume, audioRef]);

  useEffect(() => {
    if (currentFile && audioRef.current) {
      if (currentFile.path) {
        audioRef.current.src = currentFile.path;
        audioRef.current.play();
        setIsPlaying(true);
      } else if (currentFile.url) {
        if (audioRef.current.src) {
          URL.revokeObjectURL(audioRef.current.src);
          audioRef.current.src = "";
        }
        audioRef.current.src = currentFile.url;
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  }, [currentFile]);

  const handleSavePlaylist = async (name: string) => {
    try {
      if (!name) {
        toast({
          description: "debe nombrar la lista",
          variant: "error",
        });
        return;
      }

      const songsMetadata = songs.map((song) => ({
        title: song.title,
        artist: song.artist || "Unknown",
        duration: song.duration || 0,
      }));

      const formData = new FormData();

      formData.append("name", name);
      formData.append("createdAt", new Date().toISOString());
      formData.append("songsMetadata", JSON.stringify(songsMetadata));

      songs.forEach((song, index) => {
        if (song.file) {
          formData.append("songs", song.file);
        } else {
          toast({
            description: `Canción ${index} no tiene archivo adjunto`,
            variant: "error",
          });
        }
      });

      setIsOpen(false);

      const response = await savePlaylist(formData);
      toast({
        description: response.message,
        variant: "success",
      });
      setReload(true);
    } catch (error: any) {
      toast({
        description: error.response.data.message,
        variant: "error",
      });
    }
  };

  const handlePlayListSelected = async (playListItems: item[] | Song[]) => {
    try {
      if (!playListItems || !Array.isArray(playListItems)) {
        toast({
          description: "invalid playlist data",
          variant: "error",
        });
        return;
      }

      const transformedSongs = await Promise.all(
        playListItems.map(async (item) => {
          try {
            if (!item?.path) {
              toast({
                description: "Item has no URL",
                variant: "error",
              });
              return null;
            }

            return {
              id: item.id,
              title:
                item.metadata?.title ||
                item.filename?.replace(/\.[^/.]+$/, "") ||
                "Unknown",
              artist: item.metadata?.artist || "Artista desconocido",
              duration: item.metadata?.duration || "0:00",
              url: item.path,
            };
          } catch (error) {
            toast({
              description: "Error processing song",
              variant: "error",
            });
            return null;
          }
        })
      );

      const songsTransform = transformedSongs.filter((song) => song !== null);
      setSongs(songsTransform);
      setOpenList(false);
    } catch (error) {
      toast({
        description: `Error transforming playlists`,
        variant: "error",
      });
    }
  };

  const setupAudioContext = () => {
    if (audioRef.current && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      sourceNodeRef.current = audioContextRef.current.createMediaElementSource(
        audioRef.current
      );
      sourceNodeRef.current.connect(audioContextRef.current.destination);
    }
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const getAudioDuration = (file: File): Promise<number> => {
    return new Promise((resolve) => {
      const audio = new Audio();
      audio.src = URL.createObjectURL(file);
      audio.onloadedmetadata = () => {
        resolve(audio.duration);
        URL.revokeObjectURL(audio.src);
      };
    });
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);

      const newSongs = await Promise.all(
        newFiles.map(async (file) => {
          const duration = await getAudioDuration(file);
          return {
            id: URL.createObjectURL(file),
            title: file.name.replace(/\.[^/.]+$/, ""),
            artist: "Artista desconocido",
            duration: formatDuration(duration),
            path: URL.createObjectURL(file),
            file: file,
          };
        })
      );
      setSongs([...songs, ...newSongs]);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        setSelectedSong,
        selectedSong,
        setupAudioContext,
        audioContextRef,
        sourceNodeRef,
        handlePlayListSelected,
        playList,
        setPlayList,
        reload,
        setReload,
        audioRef,
        volume,
        setVolume,
        songs,
        setSongs,
        setActiveSong,
        setIsPlaying,
        activeSong,
        isPlaying,
        setCurrentFile,
        currentFile,
        isOpen,
        setIsOpen,
        handleSavePlaylist,
        setOpenList,
        openList,
        formatDuration,
        getAudioDuration,
        handleFileChange,
        fileInputRef,
        handleSongSelect,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

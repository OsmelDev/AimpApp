export interface Song {
  title: string;
  artist: string;
  fileId?: string;
  duration: string;
  filename?: string;
  id: string;
  file?: File;
  metadata?: metadata;
  url?: string;
  path?: string;
}
export interface metadata {
  title: string;
  artist: string;
  duration: string;
  originalName: string;
  contentType: string;
}

interface PlaylistSkin {
  baseBackground: string;
  content: string;
  text: string;
  song: string;
  selectedSong: string;
  songText: string;
  icon: string;
  hoverBotton: string;
}
interface EqualizerSkin {
  content: string;
  text: string;
  hoverText: string;
  bgSelect: string;
}
interface theme {
  player: string;
  header: string;
  dropdownd: string;
  dropdowndItems: string;
  coverImage: string;
  border: string;
  borderB: string;
  artist: string;
  icon: string;
  backgroundFooter: string;
  bottonsFooter: string;
  playlist: PlaylistSkin;
  equalizer: EqualizerSkin;
}
export interface themes {
  classic: theme;
  dark: theme;
  light: theme;
}

export interface PlayList {
  createdAt: string;
  id: string;
  name: string;
  songs: Song[];
}

export interface SongResponse {
  filename: string;
  id: string;
  metadata: {
    title: string;
    artist: string;
    duration: string;
    buffer: Buffer;
  };
  url: string;
}

export interface PlayListResponse {
  createdAt: string;
  id: string;
  name: string;
  songs: Song[];
}
///------------------------------------

export interface item {
  fileId: string;
  filename: string;
  id: string;
  metadata: {
    title: string;
    artist: string;
    duration: string;
    originalName: string;
    contentType: string;
  };
  path: string;
}
///------------------------------------
export interface AudioFile {
  file: File;
  title: string;
  artist?: string;
  duration?: number;
  id?: string; // Para manejo interno en el front
}

export interface PlaylistForm {
  name: string;
  songs: AudioFile[];
  coverImage?: File;
}

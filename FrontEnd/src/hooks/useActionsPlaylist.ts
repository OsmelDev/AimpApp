import { playlistServices } from "@/services/services";

export const useActionsPlaylist = () => {
  const { saveService } = playlistServices();

  const savePlaylist = async (formData: FormData) => {
    const { data } = await saveService(formData);
    return data;
  };

  return { savePlaylist };
};

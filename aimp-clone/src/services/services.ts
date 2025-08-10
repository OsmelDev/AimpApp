import { axiosIntance } from "../../intance/axios";

export const playlistServices = () => {
  const { playList } = axiosIntance();

  const saveService = async (formData: FormData) => {
    const body = formData;
    const response = await playList.post("/save", body, {
      withCredentials: true,
    });

    if (response.statusText != "Created") {
      throw new Error("Error al guardar la playlist");
    }

    return response;
  };

  const loadService = async () => {
    const response = await playList.get("/load");
    return response;
  };

  const streamSong = async (url: string) => {
    const response = await playList.get(`${url}`);
    return response;
  };

  return { saveService, loadService, streamSong };
};

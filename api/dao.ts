import { AxiosResponse } from "axios";

import axiosIntance from "~/config/axiosInstance";
import { Pokemon, Type } from "~/models";

export const Dao = {
  getPokemons: (): Promise<AxiosResponse<Pokemon[]>> => {
    return axiosIntance.get("/pokemons");
  },
  showPokemon: (id: number | string): Promise<AxiosResponse<Pokemon>> => {
    return axiosIntance.get(`/pokemons/${id}`);
  },
  getTypes: (): Promise<AxiosResponse<Type[]>> => {
    return axiosIntance.get("/types");
  },
};

import { MutationTree, ActionTree, GetterTree } from "vuex";
import { AxiosError } from "axios";

import { RootState } from "./models";
import { Dao } from "~/api/dao";
import { Repository } from "~/api/repository";
import { PokemonCreateDTO, PokemonUpdateDTO } from "~/dto";
import { ErrorHandler } from "~/interfaces";
import { Pokemon, Type } from "~/models";
import { ActionsEnum } from "~/config/enums";

export const state = (): RootState => ({
  pokemon: { id: "", name: "", img: "", types: [] },
  pokemons: [],
  types: [],
});

export const mutations: MutationTree<RootState> = {
  setTypes(state, types: Type[]) {
    state.types = types;
  },

  setPokemons(state, pokemons: Pokemon[]) {
    state.pokemons = pokemons;
  },

  setPokemon(state, pokemon: Pokemon) {
    state.pokemon = pokemon;
  },

  removePokemon(state, pokemon: Pokemon) {
    state.pokemons = state.pokemons?.filter((e) => e.id !== pokemon.id);
  },

  addPokemon(state, pokemons: Pokemon[]) {
    if ((pokemons.length = 1)) {
      const index = state.pokemons?.findIndex((e) => e.id === pokemons[0].id);
      if (index !== -1) {
        let copyArray = [...state.pokemons];
        copyArray?.splice(index, 1);
        copyArray = [...pokemons, ...copyArray];
        state.pokemons = copyArray;
      } else {
        state.pokemons = [...pokemons, ...state.pokemons];
      }
    } else {
      state.pokemons = [...pokemons, ...state.pokemons];
    }
  },

  updatePokemon(state, pokemon: Pokemon) {
    const pokemons = [...state.pokemons];
    const index = pokemons?.findIndex((e) => e.id === pokemon.id);
    if (index !== -1) {
      pokemons[index] = pokemon;
    }
    state.pokemons = pokemons;
  },
};

export const actions: ActionTree<RootState, RootState> = {
  async getTypes({ commit }) {
    try {
      const response = await Dao.getTypes();
      commit(ActionsEnum.SET_TYPES, response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const data: ErrorHandler = error.response?.data;
        console.log(data.message);
      }
    }
  },

  async getPokemons({ commit }, search?: string | number) {
    try {
      const response = await Dao.getPokemons(search);
      if (search) {
        commit(ActionsEnum.ADD_POKEMON, response.data);
      } else {
        commit(ActionsEnum.SET_POKEMONS, response.data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const data: ErrorHandler = error.response?.data;
        console.log(data.message);
      }
    }
  },

  async showPokemon({ commit }, id: string | number) {
    try {
      const response = await Dao.showPokemon(id);
      commit(ActionsEnum.SET_POKEMON, response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const data: ErrorHandler = error.response?.data;
        console.log(data.message);
      }
    }
  },

  async createPokemon({ commit }, pokemon: PokemonCreateDTO) {
    try {
      const response = await Repository.createPokemon(pokemon);
      const newPokemon = response.data.pokemon;
      commit(ActionsEnum.ADD_POKEMON, [newPokemon]);
      commit(ActionsEnum.SET_POKEMON, newPokemon);
      console.log(response.data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        const data: ErrorHandler = error.response?.data;
        console.log(data.message);
      }
    }
  },

  async updatePokemon({ commit }, pokemon: PokemonUpdateDTO) {
    try {
      const response = await Repository.updatePokemon(pokemon.id, pokemon);
      const updatedPokemon = response.data.pokemon;
      commit(ActionsEnum.ADD_POKEMON, [updatedPokemon]);
      commit(ActionsEnum.SET_POKEMON, updatedPokemon);
      console.log(response.data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        const data: ErrorHandler = error.response?.data;
        console.log(data.message);
      }
    }
  },

  async removePokemon({ commit }, id: string | number) {
    try {
      const response = await Repository.deletePokemon(id);
      const deletedPokemon = response.data.pokemon;
      commit(ActionsEnum.REMOVE_POKEMON, deletedPokemon);
      console.log(response.data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        const data: ErrorHandler = error.response?.data;
        console.log(data.message);
      }
    }
  },
};

export const getters: GetterTree<RootState, RootState> = {
  pokemon: (state) => state.pokemon,
  pokemons: (state) => state.pokemons,
  types: (state) => state.types,
};

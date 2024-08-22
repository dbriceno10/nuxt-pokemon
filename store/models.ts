import { Pokemon, Type } from "~/models";

export interface RootState {
  pokemon: Pokemon;
  pokemons: Pokemon[];
  types: Type[];
}

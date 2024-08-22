import { Pokemon } from "~/models";

export interface PokemonResponse {
  pokemon: Pokemon;
  message: string;
}

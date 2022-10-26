import { PokemonClient } from "pokenode-ts";
import { MAX_NATIONAL_DEX_ID } from "../src/server/router/pokemon";

export const getPokemonData = async () => {
  const pokemonApiClient = new PokemonClient();
  const pokemonDataList = pokemonApiClient.listPokemons(0, MAX_NATIONAL_DEX_ID);

  const pokemonData = (await pokemonDataList).results.map((pokemon, index) => ({
    id: index + 1,
    name: pokemon.name
      .toLowerCase()
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join("-"),
    spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
      index + 1
    }.png`,
  }));

  return pokemonData;
};

import { PokemonClient } from "pokenode-ts";

import { prisma } from "../src/server/db/client";
import { MAX_NATIONAL_DEX_ID } from "../src/utils/pokemonService";

const fillPokemonData = async () => {
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

  // Clear any existing data
  await prisma.pokemon.deleteMany({});

  const result = await prisma.pokemon.createMany({
    data: pokemonData,
  });
  console.log("Pokemon created?", result);

  // createMany is not supported for SQLite
  // pokemonData.forEach(async (pokemon) => {
  //   const result = await prisma.pokemon.create({ data: pokemon });
  //   console.log("Pokemon %s created?", pokemon.id, result);
  // });
};

fillPokemonData();

// NODE_ENV=development npx ts-node --compiler-options '{"module":"commonjs"}' scripts/populateDB.ts

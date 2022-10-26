import { prisma } from "../src/server/db/client";
import { getPokemonData } from "./getPokemonData";

const fillPokemonData = async () => {
  const pokemonData = await getPokemonData();

  // Clear any existing data
  await prisma.pokemon.deleteMany({});

  // const result = await prisma.pokemon.createMany({
  //   data: pokemonData,
  // });
  // console.log("Pokemon created?", result);

  // createMany is not supported for SQLite
  pokemonData.forEach(async (pokemon) => {
    const result = await prisma.pokemon.create({ data: pokemon });
    console.log("Pokemon %s created?", pokemon.id, result);
  });
};

fillPokemonData();

import { writeFileSync } from "fs";
import { getPokemonData } from "./getPokemonData";

const generateJSON = async () => {
  const pokemonData = await getPokemonData();
  writeFileSync("./src/server/db/db.json", JSON.stringify(pokemonData));
};

generateJSON();

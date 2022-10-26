import { Pokemon } from "@prisma/client";
import { z } from "zod";
import pokemonDB from "../db/db.json";
import { env } from "../env";
import { createRouter } from "./context";

export const MAX_NATIONAL_DEX_ID = 493;

export const pokemonRouter = createRouter().query("get-game", {
  input: z.object({ numOptions: z.number().min(1).max(MAX_NATIONAL_DEX_ID) }),
  async resolve({ ctx, input }) {
    const options: number[] = [];
    while (options.length !== input.numOptions) {
      let val = Math.floor(Math.random() * MAX_NATIONAL_DEX_ID) + 1;
      if (options.indexOf(val) === -1) options.push(val);
    }

    let pokemonOptions: Pokemon[] = [];
    if (env.PRISMA_ENABLED.toLowerCase() === "true") {
      pokemonOptions = await ctx.prisma.pokemon.findMany({
        where: {
          id: { in: options },
        },
      });
    } else {
      const pokemonData: Pokemon[] = pokemonDB;
      for (let i = 0; i < options.length; ++i) {
        const idx = options[i]! - 1;
        const pokemon = pokemonData[idx]!;
        pokemonOptions.push(pokemon);
      }
    }

    if (pokemonOptions.length !== input.numOptions)
      throw new Error("Failed to find " + input.numOptions + " Pokémon!");

    const answer =
      pokemonOptions[Math.floor(Math.random() * pokemonOptions.length)];

    if (!answer) throw new Error("Failed to pick an answer!");

    return {
      answer: {
        name: answer.name,
        spriteUrl: answer.spriteUrl,
      },
      options: pokemonOptions.map((p) => p.name),
    };
  },
});

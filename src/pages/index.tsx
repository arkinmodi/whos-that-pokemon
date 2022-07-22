import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { trpc } from "../utils/trpc";

import NextPokemonButton from "../components/nextPokemonButton";
import PokemonOption from "../components/pokemonOptions";

const Home: NextPage = () => {
  const initialMessage = "👇 Pick An Option!";
  const blackedOut = { filter: "brightness(0)" };

  const [result, setResult] = useState(initialMessage);
  const [score, setScore] = useState(0);
  const [pokemonVisibility, setPokemonVisibility] = useState(blackedOut);
  const [isPokemonImageLoading, setIsPokemonImageLoading] = useState(true);

  const { data, isLoading, refetch } = trpc.useQuery(
    [
      "pokemon.get-game",
      {
        numOptions: 4,
      },
    ],
    {
      refetchInterval: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const checkAnswer = (pokemonName: string) => {
    if (!data) return;

    const answer = data.answer.name;
    if (pokemonName === answer) {
      setResult("👏 Nice Job! It's " + answer + "!");
      setScore(score + 1);
    } else {
      setResult("👎 Close, but it's " + answer + "!");
    }
    setPokemonVisibility({ filter: "brightness(1)" });
  };

  const nextPokemon = () => {
    setPokemonVisibility(blackedOut);
    setIsPokemonImageLoading(true);
    refetch();
    setResult(initialMessage);
  };

  const isRoundDone =
    isLoading || isPokemonImageLoading || result !== initialMessage;

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center">
      {data && (
        <div className="animate-fade-in flex flex-col items-center p-4">
          <h1 className="text-4xl font-bold text-center p-2">
            Who&apos;s that Pokémon?
          </h1>
          <p className="text-xl text-center p-2">Score: {score}</p>
          <Image
            src={data.answer.spriteUrl}
            width={384}
            height={384}
            style={pokemonVisibility}
            alt=""
            priority
            onLoadingComplete={() => setIsPokemonImageLoading(false)}
          />
          <p className="text-xl text-center p-4">{result}</p>
          <div className="flex flex-wrap justify-center gap-4 min-w-full">
            {data.options.map((opt) => (
              <PokemonOption
                key={opt}
                name={opt}
                disabled={isRoundDone}
                checkAnswer={() => checkAnswer(opt)}
                isLoading={isPokemonImageLoading}
              />
            ))}
          </div>
          <NextPokemonButton
            isRoundDone={isRoundDone}
            nextPokemon={nextPokemon}
          />
        </div>
      )}
      {!data && (
        <Image src="/loading.svg" width={256} height={256} alt="Loading..." />
      )}
      <footer className="w-full text-center pb-2 relative lg:fixed bottom-2">
        <a
          href="https://github.com/arkinmodi/whos-that-pokemon"
          target="_blank"
          rel="noreferrer"
          className="border-b-2 border-solid border-slate-200 hover:border-slate-400"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
};

export default Home;

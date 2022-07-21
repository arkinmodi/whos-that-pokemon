import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const initialMessage = "👇 Pick An Option!";
  const blackedOut = { filter: "brightness(0)" };

  const [result, setResult] = useState(initialMessage);
  const [score, setScore] = useState(0);
  const [pokemonVisibility, setPokemonVisibility] = useState(blackedOut);

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
    setResult(initialMessage);
    setPokemonVisibility(blackedOut);
    refetch();
  };

  const isRoundDone = isLoading || result !== initialMessage;

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center">
      {data && (
        <div className="animate-fade-in flex flex-col items-center p-4">
          <h1 className="text-3xl font-bold text-center p-2">
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
          />
          <p className="text-xl text-center p-4">{result}</p>
          <div className="flex flex-wrap justify-center gap-4 min-w-full">
            {data.options.map((opt) => (
              <PokemonOption
                key={opt}
                name={opt}
                disabled={isRoundDone}
                checkAnswer={() => checkAnswer(opt)}
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
          className="border-b-2 border-solid border-slate-200 hover:border-slate-400"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
};

const PokemonOption: React.FC<{
  name: string;
  checkAnswer: () => void;
  disabled: boolean;
}> = (props) => {
  return (
    <button
      disabled={props.disabled}
      onClick={props.checkAnswer}
      className="p-4 bg-yellow-600 w-60 text-xl"
    >
      {props.name}
    </button>
  );
};

const NextPokemonButton: React.FC<{
  isRoundDone: boolean;
  nextPokemon: () => void;
}> = (props) => {
  if (props.isRoundDone) {
    return (
      <button
        onClick={props.nextPokemon}
        className="animate-pulse text-xl p-8 h-10 min-w-full"
      >
        Next Pokémon
      </button>
    );
  } else {
    return <button disabled className="p-8 h-10 min-w-full"></button>;
  }
};

export default Home;

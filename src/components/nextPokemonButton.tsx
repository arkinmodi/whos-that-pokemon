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

export default NextPokemonButton;

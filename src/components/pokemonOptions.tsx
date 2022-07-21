const PokemonOption: React.FC<{
  name: string;
  checkAnswer: () => void;
  disabled: boolean;
  isLoading: boolean;
}> = (props) => {
  if (props.isLoading) {
    return (
      <button
        disabled={true}
        className="p-4 bg-yellow-600 w-60 h-[70px] rounded-md"
      ></button>
    );
  } else {
    return (
      <button
        disabled={props.disabled}
        onClick={props.checkAnswer}
        className="p-4 bg-yellow-600 w-60 h-[70px] text-xl rounded-md"
      >
        {props.name}
      </button>
    );
  }
};

export default PokemonOption;

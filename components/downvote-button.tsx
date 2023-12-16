interface ButtonProps {
  text: string;
  handleBadClicked: () => void;
}

const DownvoteButton: React.FC<ButtonProps> = ({ text, handleBadClicked }) => {
  return (
    <button
      onClick={handleBadClicked}
      className="bg-primary-pink px-6 py-2 text-white font-bold rounded w-32"
    >
      {text}
    </button>
  );
};

export default DownvoteButton;

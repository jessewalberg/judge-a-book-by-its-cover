"use client";
interface ButtonProps {
  text: string;
  buttonClick: () => void;
}

const UpvoteButton: React.FC<ButtonProps> = ({ text, buttonClick }) => {
  return (
    <button
      onClick={buttonClick}
      className="bg-primary-blue px-6 py-2 text-white font-bold rounded w-32"
    >
      {text}
    </button>
  );
};

export default UpvoteButton;

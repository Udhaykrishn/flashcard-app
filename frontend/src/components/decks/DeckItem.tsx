import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface DecksProps {
  id: string;
  title: string;
  description: string;
  ownerId: string;
}

interface DeckItemProps {
  deck: DecksProps;
}

const DeckItem: React.FC<DeckItemProps> = ({ deck }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/questions/${deck.id}`);
  };

  return (
    <div className="bg-gray-800  overflow-hidden relative p-4 w-[200px] h-[200px] rounded-md shadow-md cursor-pointer">
      <div
        onClick={handleClick}
        className="relative bg-gray-800 p-4 flex flex-col items-center justify-center rounded-md shadow-md cursor-pointer"
      >
        <h3 className="text-xl font-bold">{deck.title}</h3>
        <p className="mt-6">{deck.description}</p>
      </div>
      <div className=" absolute w-full bottom-0 flex justify-center items-center">
        <div>
          <Link
            to={`/decks/update/${deck.id}`}
            className="mr-10 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
          >
            Edit
          </Link>
        </div>
        <div>
          <Link
            to={`/decks/${deck.id}`}
            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
          >
            Delete
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeckItem;

import React, { useState, useEffect } from "react";
import axios from "axios";
import DeckItem from "../components/decks/DeckItem";
import { useNavigate } from "react-router-dom";

interface DecksProps {
  id: string;
  title: string;
  description: string;
  ownerId: string;
}

const Dashboard: React.FC = () => {
  const [decks, setDecks] = useState<DecksProps[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await axios.get("/decks");
        setDecks(response.data);
      } catch (error) {
        console.error("Error fetching decks:", error);
      }
    };

    fetchDecks();
  }, []);

  const createDeck = () => {
    navigate("/decks");
  };

  return (
    <main className="w-full h-screen">
      <article className="top-0 w-full h-[100%]">
        <div className="top-0 mt-10 relative h-[100%] w-full flex items-center justify-center flex-col">
          <div className="w-full top-0 absolute h-[40px]">
            <div className="w-full top-0 absolute flex items-center justify-between text-black">
              <h2 className="ml-10 font-bold text-white text-2xl">ALL DECKS</h2>
              <button
                onClick={createDeck}
                className="hover:text-white hover:bg-gray-800 w-[15%] mr-10 font-bold text-2xl rounded-md h-[100%] text-black"
              >
                Add Decks
              </button>
            </div>
          </div>
          <div className="top-0 w-full flex justify-evenly items-center gap-10">
            {decks.map((deck) => (
              <DeckItem key={deck.id} deck={deck} />
            ))}
          </div>
        </div>
      </article>
    </main>
  );
};

export default Dashboard;

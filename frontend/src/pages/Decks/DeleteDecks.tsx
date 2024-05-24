import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import ButtonBack from "../../components/ButtonBack";
import { ErrorHandle } from "../../components/ErrorHandling";

const DeleteDecks: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();

  const handleDeleteDeck = async () => {
    if (!deckId) {
      toast.error("Deck ID is missing");
      return;
    }
    try {
      const data = await axios.delete(`/decks/${deckId}`);
      console.log(data);
      toast.success("Delete Success");
      navigate("/dashboard");
    } catch (error) {
      ErrorHandle(error);
    }
  };

  return (
    <div className="p-4">
      <ButtonBack des="/dashboard" />
      <h2 className="text-3xl my-4">Delete Deck</h2>
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h2 className="text-2xl">Are you sure you want to delete this deck?</h2>
        <button
          type="button"
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteDeck}
        >
          Yes, delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteDecks;

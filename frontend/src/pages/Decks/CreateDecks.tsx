import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import ButtonBack from "../../components/ButtonBack";
import { CreateDecksProps } from "@/types/utils";

const CreateDecks: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSaveDeck = () => {
    const data: CreateDecksProps = {
      title,
      description,
    };
    axios
      .post("http://localhost:3000/decks", data)
      .then(() => {
        toast.success("Deck created successfully");
        navigate("/dashboard");
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          if (error.response && error.response.data.message) {
            const messages = error.response.data.message;
            if (Array.isArray(messages)) {
              messages.forEach((msg: string) => toast.error(msg));
            } else {
              toast.error(messages);
            }
          } else {
            toast.error("Error during deck creation");
          }
        } else {
          console.error("Error during deck creation:", error);
          toast.error("Unexpected error occurred");
        }
      });
  };

  return (
    <div className="p-4">
      <ButtonBack des="/dashboard" />
      <h2 className="text-3xl my-4">Create Deck</h2>
      <div className="flex flex-col border-2 border-white rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-gray-700 m-8" onClick={handleSaveDeck}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateDecks;

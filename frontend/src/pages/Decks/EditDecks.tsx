import { useState, useEffect } from "react";
import ButtonBack from "../../components/ButtonBack";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { EditProps } from "../../types/utils";
import { ErrorHandle } from "../../components/ErrorHandling";
import toast from "react-hot-toast";

const EditDecks = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { deckId } = useParams<{ deckId: string }>();

  useEffect(() => {
    axios
      .get(`/decks/${deckId}`)
      .then((res) => {
        console.log(res.data.title);
        setTitle(res.data.title);
        setDescription(res.data.description);
      })
      .catch((error) => {
        ErrorHandle(error);
      });
  }, [deckId]);

  const handleEditBook = () => {
    const data: EditProps = {
      title,
      description,
    };
    axios
      .put(`/decks/${deckId}`, data)
      .then(() => {
        navigate("/dashboard");
        toast.success("Edited Success");
      })
      .catch((error) => {
        ErrorHandle(error);
      });
  };

  return (
    <div className="p-4">
      <ButtonBack des="/dashboard" />
      <h2 className="text-3xl my-4">Edit Decks</h2>
      <div className="flex flex-col border-2 rounded-xl w-[600px] p-4 mx-auto">
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
        <button
          className="p-2 border-2 border-gray-500 bg-gray-800-300 m-8"
          onClick={handleEditBook}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditDecks;

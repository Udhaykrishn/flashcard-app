import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import ButtonBack from "../../components/ButtonBack";
import { ErrorHandle } from "../../components/ErrorHandling";

const DeleteQuestion: React.FC = () => {
  const { questionId, deckId } = useParams<{
    questionId: string;
    deckId: string;
  }>();
  const navigate = useNavigate();

  const handleDeleteQuestion = async () => {
    if (!questionId) {
      toast.error("Question ID is missing");
      return;
    }
    try {
      const data = await axios.delete(`/questions/${questionId}`);
      console.log(data.data.id);
      toast.success("Delete Success");
      navigate(`/questions/${deckId}`);
    } catch (error) {
      ErrorHandle(error);
    }
  };

  return (
    <div className="p-4">
      <ButtonBack des={`/questions/${deckId}`} />
      <h2 className="text-3xl my-4">Delete Question</h2>
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h2 className="text-2xl">
          Are you sure you want to delete this Question?
        </h2>
        <button
          type="button"
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteQuestion}
        >
          Yes, delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteQuestion;

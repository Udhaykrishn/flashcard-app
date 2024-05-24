import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import ButtonBack from "../../components/ButtonBack";
import { createQuestionProps } from "@/types/utils";

const CreateQuestion: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  console.log(deckId);

  const handleSaveQuestion = () => {
    const data: createQuestionProps = { question, answer };
    axios
      .post(`http://localhost:3000/questions/${deckId}`, data)
      .then(() => {
        toast.success("Question created successfully");
        navigate(`/questions/${deckId}`);
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
            toast.error("Error during Question creation");
          }
        } else {
          console.error("Error during deck creation:", error);
          toast.error("Unexpected error occurred");
        }
      });
  };

  return (
    <div className="p-4">
      <ButtonBack des={`/questions/${deckId}`} />
      <h2 className="text-3xl my-4">Create Question</h2>
      <div className="flex flex-col border-2 border-white rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Question</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Answer</label>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-gray-700 m-8" onClick={handleSaveQuestion}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateQuestion;

import { useState, useEffect } from "react";
import ButtonBack from "../../components/ButtonBack";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { EditQuestionProps } from "../../types/utils";
import { ErrorHandle } from "../../components/ErrorHandling";
import toast from "react-hot-toast";

const EditQuestion = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const { questionId, deckId } = useParams<{
    questionId: string;
    deckId: string;
  }>();
  useEffect(() => {
    axios
      .get(`/questions/${questionId}/deck/${deckId}`)
      .then((res) => {
        console.log(res.data.title);
        setQuestion(res.data.question);
        setAnswer(res.data.answer);
      })
      .catch((error) => {
        ErrorHandle(error);
      });
  }, [questionId, deckId]);

  const handleEditQuestion = () => {
    const data: EditQuestionProps = {
      question,
      answer,
    };
    axios
      .patch(`/questions/${questionId}`, data)
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
      <ButtonBack des={`/questions/${deckId}`} />
      <h2 className="text-3xl my-4">Edit Question</h2>
      <div className="flex flex-col border-2 rounded-xl w-[600px] p-4 mx-auto">
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
        <button
          className="p-2 border-2 border-gray-500 bg-gray-800-300 m-8"
          onClick={handleEditQuestion}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditQuestion;

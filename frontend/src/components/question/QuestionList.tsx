import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface QuestionListProps {
  id: string;
  question: string;
  answer: string;
  deckId: string;
  index: number;
}

const QuestionList = ({
  id,
  deckId,
  question,
  answer,
  index,
}: QuestionListProps) => {
  const [isClick, setIsClick] = useState(false);
  const navigate = useNavigate();
  const showAnswer = () => {
    setIsClick(!isClick);
  };

  console.log(id);

  const DeleteQuestion = () => {
    navigate(`/questions/${id}/delete/${deckId}`);
  };
  const EditQuestion = () => {
    navigate(`/questions/${id}/edit/${deckId}`);
  };

  return (
    <div
      className="max-w-xl w-full mx-auto flex items-center justify-between border p-4 rounded-lg my-2"
      key={index}
    >
      <div className="flex items-center">
        <p className="font-bold text-2xl">{isClick ? answer : question}</p>
        <button
          onClick={showAnswer}
          className="ml-4 bg-gray-200 hover:bg-gray-300 text-black px-2 py-1 rounded"
        >
          {isClick ? "Hide Answer" : "Show Answer"}
        </button>
      </div>
      <div className="flex flex-col items-center">
        <div>
          <button
            onClick={EditQuestion}
            className="mb-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
        </div>
        <div>
          <button
            onClick={DeleteQuestion}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionList;

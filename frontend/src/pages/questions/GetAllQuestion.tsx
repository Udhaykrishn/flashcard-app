import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { createQuestionProps } from "@/types/utils";
import ButtonBack from "../../components/ButtonBack";
import QuestionList from "../../components/question/QuestionList";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<createQuestionProps[]>([]);
  const [deckTitle, setDeckTitle] = useState<string>("");
  const { deckId } = useParams<{ deckId: string }>();

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await axios.get(`/questions/${deckId}`);
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching decks:", error);
      }
    };

    const fetchDeckTitle = async () => {
      try {
        const response = await axios.get(`decks/${deckId}`);
        setDeckTitle(response.data.title);
      } catch (error) {
        console.log("Error fetching decks:", error);
      }
    };

    fetchDecks();
    fetchDeckTitle();
  }, [deckId]);

  const createQuestion = () => {
    navigate(`/questions/create/${deckId}`);
  };

  return (
    <main className="w-full h-screen ">
      <div className="w-full h-[50px] mt-2">
        <ButtonBack des="/dashboard" />
      </div>
      <article className="top-0 w-full h-[100%]">
        <div className="top-0 mt-4 relative h-[100%] w-full flex items-center justify-center flex-col">
          <div className="w-full top-0 absolute h-[40px]">
            <div className="w-full top-0 absolute flex items-center justify-between text-black">
              <h2 className="ml-10 font-bold text-white text-2xl">
                ALL Questions in {deckTitle}
              </h2>
              <button
                onClick={createQuestion}
                className="hover:text-white hover:bg-gray-800 w-[15%] mr-10 font-bold text-2xl rounded-md h-[100%] text-black"
              >
                Add Questions
              </button>
            </div>
          </div>
          <div className="top-0 w-full flex justify-center flex-col items-center gap-10">
            {questions.map((data, index) =>
              data.id && data.deckId ? (
                <QuestionList
                  key={data.id}
                  id={data.id}
                  deckId={data.deckId}
                  question={data.question}
                  answer={data.answer}
                  index={index}
                />
              ) : null
            )}
          </div>
        </div>
      </article>
    </main>
  );
};

export default Dashboard;

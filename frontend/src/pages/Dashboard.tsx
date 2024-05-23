import ButtonBack from "../components/ButtonBack";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Dashboard = () => {
  const userContext = useContext(UserContext);

  const { user } = userContext || {};

  const createDecks = () => {};

  console.log(user?.id);

  return (
    <main className="w-full h-screen">
      <section className="w-full flex justify-between items-center mt-4 h-14">
        <ButtonBack des="/dashboard" />
      </section>
      <article className="mt-4 w-full h-screen ">
        <div className="w-ful  h-12 text-black flex justify-end ">
          <button
            className=" hover:text-white hover:bg-gray-800 w-[30%] mr-4 font-bold text-xl rounded-md h-[100%] text-black"
            onClick={createDecks}
          >
            Add Decks
          </button>
        </div>
      </article>
    </main>
  );
};

export default Dashboard;

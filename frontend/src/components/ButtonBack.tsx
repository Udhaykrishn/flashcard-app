import { Link } from "react-router-dom";

const ButtonBack = ({ des = "/" }) => {
  return (
    <>
      <Link
        to={des}
        className="w-[15%] flex items-center justify-center font-bold text-xl ml-5 rounded-lg h-[100%] bg-black"
      >
        Back
      </Link>
    </>
  );
};

export default ButtonBack;

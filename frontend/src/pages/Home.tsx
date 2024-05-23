import { Button } from "@nextui-org/react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const cookies = new Cookies();
    const checkToken = cookies.get("access_token");
    if (checkToken) {
      navigate("/dashboard");
    }
  }, [navigate]);
  return (
    <div className="h-screen w-full flex items-center justify-center flex-col ">
      <h2 className="m-10 text-7xl font-bold ">Flash Cards</h2>
      <Button color="primary" size="lg" variant="ghost">
        <Link to={"/auth/signup"}>Get Start</Link>
      </Button>
    </div>
  );
};

export default Home;

import React from "react";
import { DrawerWithForm } from "../../Components";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const Home = () => {
  const navigate = useNavigate();

  const LogoutHandler = () => {
    localStorage.removeItem("token");

    navigate("/");
  };
  return (
    <>
      <div className="w-72 mx-auto my-20  rounded-md">
        <h1 className="text-3xl">Welcome User</h1>
        <DrawerWithForm />
        <Button className="w-52" onClick={LogoutHandler}>
          Logout
        </Button>
      </div>
    </>
  );
};

export default Home;

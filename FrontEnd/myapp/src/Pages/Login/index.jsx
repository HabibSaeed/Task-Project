import React, { useState } from "react";
import { Btn } from "../../Components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Input, Typography } from "@material-tailwind/react";
import { loginAsync } from "../../store/Slices/ApiSlices";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SignInHandler = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        alert("Please Enter Required Fields");
        return;
      }
      const actionResult = await dispatch(loginAsync({ email, password }));
      const user = actionResult.payload;
      if (user && user.token) {
        // Save token in local storage upon successful login
        localStorage.setItem("token", user.token);
        navigate("/Home");
      }

      setEmail("");
      setPassword("");
      navigate("/Home");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={SignInHandler}>
      <div className="flex text-center bg-white py-6 rounded-lg border w-80 mx-auto shadow-2xl my-32 px-4 flex-col gap-7">
        <h1 className="text-2xl">Sign In</h1>
        <Input
          color="blue"
          label="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          color="blue"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Fixed the onChange event handler
        />
        <Typography color="gray" className="text-center font-normal">
          Don't have an account?{" "}
          <Link to={"/signup"} className="font-medium text-blue-300">
            Sign Up
          </Link>
        </Typography>
        <Btn value="Sign In" />{" "}
      </div>
    </form>
  );
};

export default Login;

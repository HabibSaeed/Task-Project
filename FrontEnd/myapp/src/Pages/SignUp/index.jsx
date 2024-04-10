import React, { useState } from "react";
import { Btn } from "../../Components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Input, Typography } from "@material-tailwind/react";
import { signUpAsync } from "../../store/Slices/ApiSlices";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SignUpHandler = async (e) => {
    try {
      e.preventDefault();
      try {
        if (!fullName || !email || !password) {
          alert("Please Enter Required Fields");
          return;
        }
        dispatch(signUpAsync({ fullName, email, password }));
        navigate("/");
      } catch (error) {
        console.log(error.message);
      }
      setFullName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <form onSubmit={SignUpHandler}>
        <div className="flex text-center  bg-white py-6 rounded-lg border shadow-2xl w-80 mx-auto my-20 px-4 flex-col gap-7">
          <h1 className="text-xl">Sign Up</h1>
          <Input
            color="blue"
            label="UserName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <Typography color="gray" className="text-center font-normal">
            Already have an account?{" "}
            <Link to={"/"} className="font-medium text-blue-300">
              Sign In
            </Link>
          </Typography>
          <Btn value="Sign Up" />
        </div>
      </form>
    </>
  );
};

export default SignUp;

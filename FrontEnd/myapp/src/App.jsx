import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home, Login, SignUp } from "./Pages";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/Home" /> : <Login />}
        />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;

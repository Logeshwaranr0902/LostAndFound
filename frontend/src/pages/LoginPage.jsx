import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successful, setSuccessful] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required!");
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      console.log("Login successful", data);
      setError(""); // Clear error on success
      setSuccessful("Login Successful!");

      localStorage.setItem("token", data.access_token);

      setTimeout(() => {
        navigate("/choicepage");
      }, 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="bg-black h-screen flex flex-col justify-center items-center">
        {/* Website Name outside the login form */}
        <div className="text-center mb-8">
          <p className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-500 to-blue-300">
            Lost and Found
          </p>
        </div>

        <div className="bg-cyan-900 w-96 rounded-2xl flex flex-col p-6">
          <p className="text-white font-extrabold text-2xl text-center">
            Login
          </p>
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}
          {successful && (
            <p className="text-green-500 text-sm text-center mt-2">
              {successful}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-5"></div>
            <label className="block text-white text-left ml-6 font-bold">
              Email
            </label>
            <input
              type="text"
              placeholder=" E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-72 rounded-lg ml-6 h-8 mt-4 p-2"
            />
            <div className="mb-5"></div>
            <label className="block text-white text-left ml-6 font-bold">
              Password
            </label>
            <input
              type="password"
              placeholder=" Password"
              value={password}
              className="w-72 rounded-lg ml-6 h-8 mt-4 p-2"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="my-8"></div>
            <button
              type="submit"
              className="w-72 ml-6 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-white">
            Don't have an account?{" "}
            <Link
              to="/registerpage"
              className="text-blue-500 hover:text-red-500"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

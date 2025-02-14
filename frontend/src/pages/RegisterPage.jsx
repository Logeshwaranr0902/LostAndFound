import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successful, setsuccessful] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !name ||
      !email ||
      !phone ||
      !address ||
      !password ||
      !confirmPassword
    ) {
      setError("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (password.length < 8) {
      setError("Password is too short");
      return;
    }
    if (phone.length != 10) {
      setError("Enter a valid number");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, address, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Registration failed!");
      }
      console.log("Registration successful", data);
      setError(""); // Clear error on success
      setsuccessful("Registration Successful");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-blue-950 p-6 rounded-lg shadow-lg w-[600px]">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">
          Sign Up
        </h2>
        {error && (
          <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
        )}
        {successful && (
          <p className="text-green-500 text-sm text-center mt-2">
            {" "}
            {successful}
          </p>
        )}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {/* Name Field */}
          <div className="col-span-2">
            <label className="block text-white">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-lg mt-1"
              placeholder="Enter your name"
            />
          </div>

          {/* Email Field */}
          <div className="col-span-2">
            <label className="block text-white">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg mt-1"
              placeholder="Enter your email"
            />
          </div>

          {/* Phone Number Field */}
          <div>
            <label className="block text-white">Phone Number</label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded-lg mt-1"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Address Field */}
          <div className="col-span-2">
            <label className="block text-white">Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border rounded-lg mt-1"
              placeholder="Enter your address"
              rows="3"
            ></textarea>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-white">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg mt-1"
              placeholder="Enter your password"
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-white">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded-lg mt-1"
              placeholder="Confirm your password"
            />
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-white">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:text-red-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;

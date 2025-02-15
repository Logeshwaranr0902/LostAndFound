import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-900 to-gray-900">
      <div className="text-center text-white px-4">
        {/* Main Title */}
        <h1 className="text-6xl  font-extrabold mb-6 animate__animated animate__fadeIn animate__delay-1s">
          Lost & Found
        </h1>

        {/* Slogan */}
        <h2 className="text-3xl  font-semibold mb-10 animate__animated animate__fadeIn animate__delay-2s">
          Where lost things find their way back
        </h2>

        {/* Buttons */}
        <div className="flex justify-center space-x-6">
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-black px-6 py-3 rounded-lg text-lg hover:bg-blue-700 hover:text-white transition duration-300 transform hover:scale-105 animate__animated animate__fadeIn animate__delay-3s"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/registerpage")}
            className="bg-white text-black px-6 py-3 rounded-lg text-lg hover:bg-green-600 hover:text-white transition duration-300 transform hover:scale-105 animate__animated animate__fadeIn animate__delay-3s"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

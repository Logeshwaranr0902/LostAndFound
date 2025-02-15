import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ChoicePage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserName = localStorage.getItem("userName");

    if (!token) {
      navigate("/login");
    } else {
      setUserName(storedUserName || "User");
    }
  }, [navigate]);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <div className="bg-gradient-to-b from-blue-400  to-white min-h-screen">
      <div className="flex justify-end p-4">
        <button
          onClick={handleLogOut}
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
      <div className="flex flex-col justify-center items-center min-h-screen -mt-20">
        <div>
          <h1 className="text-2xl mb-3 font-semibold text-black">
            Hey,{" "}
            <span className="text-white font-semibold text-2xl">
              {userName}
            </span>
          </h1>

          <h2 className="text-2xl font-bold mb-6 text-center">
            What would you like to do?
          </h2>

          <div className="space-y-4">
            <Link to="/findpage">
              <button className="w-full mb-2 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition">
                Find a Product
              </button>
            </Link>

            <Link to="/reportpage">
              <button className="w-full mb-2 bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition">
                Report Unknown Lost Product
              </button>
            </Link>
            <Link to="/reglostpage">
              <button className="w-full mb-2 bg-red-500 text-white p-3 rounded-lg hover:bg-red-800 transition">
                Report my Lost Product
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChoicePage;

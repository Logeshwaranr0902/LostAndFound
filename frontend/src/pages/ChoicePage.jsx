import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ChoicePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
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
            <h1 className="text-2xl mb-3 font-handwriting underline">Hey,</h1>
            <h2 className="text-2xl font-bold mb-6 text-center">
              What would you like to do?
            </h2>

            <div className="space-y-4">
              {/* Find a Product Button */}
              <Link to="/findpage">
                <button className="w-full mb-2 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition">
                  Find a Product
                </button>
              </Link>

              {/* Report a Lost Product Button */}
              <Link to="/reportpage">
                <button className="w-full mb-2 bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition">
                  Report a Lost Product
                </button>
              </Link>
              {/* Register your Lost Product Button
              <Link to="/reglostpage">
                <button className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition">
                  Register your Lost Product
                </button>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChoicePage;

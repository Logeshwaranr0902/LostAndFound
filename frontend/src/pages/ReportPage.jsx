import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function ReportPage() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productLocation, setProductLocation] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [dateFound, setDateFound] = useState("");
  const [timeFound, setTimeFound] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [successful, setSuccessful] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setEmail(localStorage.getItem("email"));
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !productName ||
      !productDescription ||
      !productCategory ||
      !productLocation ||
      !productImage ||
      !dateFound ||
      !timeFound
    ) {
      setError("All fields are required!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("product_name", productName);
      formData.append("product_description", productDescription);
      formData.append("product_category", productCategory);
      formData.append("product_location", productLocation);
      formData.append("product_image", productImage);
      formData.append("date_found", dateFound);
      formData.append("time_found", timeFound);
      formData.append("email", email);

      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/lost-product-ad/", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Report failed. Please try again.");
      }

      const data = await response.json();
      setError("");
      setSuccessful("Report Submitted Successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <div className="bg-gradient-to-b from-green-400  to-white min-h-screen">
      <div className="sticky top-0  z-10 p-4 flex justify-between items-center">
        <div className="flex-grow"></div>

        <button
          onClick={handleLogOut}
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="flex items-center justify-center min-h-screen -mt-20">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[1200px]">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Report Lost Product
          </h2>
          {error && (
            <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
          )}
          {successful && (
            <p className="text-green-500 text-sm mb-2 text-center">
              {successful}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex flex-row">
              <div className="flex flex-col w-1/2">
                <div className="mb-4">
                  <label className="block">Product Name</label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full p-2 border rounded-lg mt-1"
                    placeholder="Enter the product name"
                  />
                </div>

                <div className="mb-4">
                  <label className="block">Product Description</label>
                  <textarea
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="w-full p-2 border rounded-lg mt-1"
                    placeholder="Enter the product description (Enter any relevant keywords about the products to get the product filtered)"
                    rows="4"
                  ></textarea>
                </div>

                <div className="mb-4 ml-2 mt-2">
                  <label className="block">Category of the product</label>
                  <input
                    type="text"
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="w-full p-2 border rounded-lg mt-1"
                    placeholder="Enter the relevant categories"
                  />
                </div>
              </div>

              <div className="flex flex-col w-1/2">
                <div className="mb-4 ml-2">
                  <label className="block">
                    Exact Location of the lost product
                  </label>
                  <input
                    type="text"
                    value={productLocation}
                    onChange={(e) => setProductLocation(e.target.value)}
                    className="w-full p-2 border rounded-lg mt-1"
                    placeholder="Enter the product location where it was founded"
                  />
                </div>

                <div className="mb-4 ml-2">
                  <label className="block">Product Image</label>
                  <input
                    type="file"
                    onChange={(e) => {
                      console.log("Selected File:", e.target.files[0]);
                      setProductImage(e.target.files[0]);
                    }}
                    className="w-full p-2 border rounded-lg mt-1"
                    placeholder="Upload the image of the product"
                  />
                </div>

                <div className="flex mb-2 ml-2 space-x-4">
                  <div className="w-1/2">
                    <label className="block">Date Found</label>
                    <input
                      type="date"
                      value={dateFound}
                      onChange={(e) => setDateFound(e.target.value)}
                      className="w-full p-2 border rounded-lg mt-1"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block">Time Found</label>
                    <input
                      type="time"
                      value={timeFound}
                      onChange={(e) => setTimeFound(e.target.value)}
                      className="w-full p-2 border rounded-lg mt-1"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label className="block ml-2">Contact Email ID</label>
                  <input
                    type="email"
                    value={email}
                    readOnly
                    className="w-full ml-2 p-2 border rounded-lg mt-1"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            >
              Submit Report
            </button>
          </form>
        </div>
      </div>
      <NavBar />
    </div>
  );
}

export default ReportPage;

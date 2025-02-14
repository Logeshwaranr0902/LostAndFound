import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function LostProductAdPage() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productLocation, setProductLocation] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [dateLost, setDateLost] = useState("");
  const [timeLost, setTimeLost] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !productName ||
      !productDescription ||
      !productCategory ||
      !productLocation ||
      !productImage ||
      !dateLost ||
      !timeLost
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
      formData.append("date_lost", dateLost);
      formData.append("time_lost", timeLost);
      formData.append("email", email);

      const response = await fetch("http://127.0.0.1:8000/lost-product-ad/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Submission failed. Please try again.");
      }

      const data = await response.json();
      console.log("Submission successful", data);
      setError(""); // Clear error on success
      alert("Lost Product Ad Submitted Successfully!");
    } catch (err) {
      setError(err.message);
    }
  };
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/login");
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="sticky top-0 bg-gray-100 z-10 p-4 flex justify-between items-center">
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
            Advertise Lost Product
          </h2>
          {error && (
            <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
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
                    placeholder="Enter the product description (Include any relevant keywords to help find the product)"
                    rows="4"
                  ></textarea>
                </div>

                <div className="mb-4 ml-2">
                  <label className="block mt-2">Product Category</label>
                  <input
                    type="text"
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="w-full p-2 border rounded-lg mt-1"
                    placeholder="Enter the product category"
                  />
                </div>
              </div>

              <div className="flex flex-col w-1/2">
                <div className="mb-4 ml-2">
                  <label className="block">Enter Lost Location</label>
                  <input
                    type="text"
                    value={productLocation}
                    onChange={(e) => setProductLocation(e.target.value)}
                    className="w-full p-2 border rounded-lg mt-1"
                    placeholder="Enter an approximate location where the product would have been lost"
                  />
                </div>

                <div className="mb-4 ml-2">
                  <label className="block">Product Image</label>
                  <input
                    type="file"
                    onChange={(e) => setProductImage(e.target.files[0])}
                    className="w-full p-2 border rounded-lg mt-1"
                    placeholder="Upload an image of the product"
                  />
                </div>

                <div className="flex mb-2 ml-2 space-x-4">
                  <div className="w-1/2">
                    <label className="block">Date Lost</label>
                    <input
                      type="date"
                      value={dateLost}
                      onChange={(e) => setDateLost(e.target.value)}
                      className="w-full p-2 border rounded-lg mt-1"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block">Time Lost</label>
                    <input
                      type="time"
                      value={timeLost}
                      onChange={(e) => setTimeLost(e.target.value)}
                      className="w-full p-2 border rounded-lg mt-1"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label className="block ml-2">Contact Email ID</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full ml-2 p-2 border rounded-lg mt-1"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            >
              Submit Ad
            </button>
          </form>
        </div>
      </div>
      <NavBar />
    </div>
  );
}

export default LostProductAdPage;

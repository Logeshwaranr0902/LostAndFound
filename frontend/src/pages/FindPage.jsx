import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function CollapsibleCard({
  id,
  name,
  description,
  foundAt,
  foundOn,
  imageUrl,
  email,
  productlocation,
  onDelete,
  onUpdate,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const limit = 100;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleContactClick = () => {
    setShowEmail(!showEmail);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg w-2/3 p-6 mt-5 flex flex-col">
      <div className="flex">
        <img
          src={`http://127.0.0.1:8000${imageUrl}`}
          alt="Product"
          className="w-1/3 rounded-lg h-[200px] object-cover"
        />
        <div className="ml-6 w-2/3">
          <h2 className="text-2xl font-bold mb-2">{name}</h2>
          <p className="text-gray-700 mb-2">
            {isExpanded ? description : `${description.slice(0, limit)}...`}
          </p>
          {description.length > limit && (
            <button
              className="self-end text-blue-600 hover:underline"
              onClick={toggleExpand}
            >
              {isExpanded ? "Show less" : "Read more"}
            </button>
          )}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-700 mb-2">
                <strong>Found at:</strong> {foundAt}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>On:</strong> {foundOn}
              </p>
              <p className="text-gray-700">
                <strong>Product Location:</strong> {productlocation}
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <button
                className="bg-blue-300 px-4 py-1 rounded-md"
                onClick={handleContactClick}
              >
                {showEmail ? email : "Contact"}
              </button>
              <div className="flex space-x-2">
                <button
                  className="bg-yellow-400 px-4 py-1 rounded-md"
                  onClick={() => onUpdate(id)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 px-4 py-1 rounded-md text-white"
                  onClick={() => onDelete(id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FindPage() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
      try {
        const url = searchQuery
          ? `http://127.0.0.1:8000/view-lost-product/?search=${searchQuery}`
          : "http://127.0.0.1:8000/view-lost-product/";
        const response = await fetch(url);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [searchQuery, navigate]);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/delete-product/${id}/`, {
        method: "DELETE",
      });
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdate = (id) => {
    const productToUpdate = products.find((product) => product.id === id);
    setSelectedProduct(productToUpdate);
  };

  const handleUpdateSubmit = async () => {
    const formData = new FormData();
    formData.append("product_name", selectedProduct.product_name);
    formData.append("product_description", selectedProduct.product_description);
    formData.append("date_found", selectedProduct.date_found);
    formData.append("time_found", selectedProduct.time_found);
    formData.append("product_location", selectedProduct.product_location);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/update-product/${selectedProduct.id}/`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Product updated successfully!");
        setProducts(
          products.map((p) =>
            p.id === selectedProduct.id ? selectedProduct : p
          )
        );
        setSelectedProduct(null);
      } else {
        alert("Failed to update product!");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center p-4 sticky top-0 bg-gray-100 z-10">
          <div className="flex-grow flex justify-center">
            <input
              type="text"
              className="p-2 border rounded-lg w-1/2"
              placeholder="Search for a product (Enter product name, location, dimensions, etc.)"
              onChange={handleSearchChange}
            />
          </div>
          <button
            onClick={handleLogOut}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <div className="flex flex-col justify-center items-center mt-10 mb-10">
          {products.length === 0 ? (
            <p>No products to display</p>
          ) : (
            products.map((product) => (
              <CollapsibleCard
                key={product.id}
                id={product.id}
                name={product.product_name}
                description={product.product_description}
                foundAt={product.date_found}
                foundOn={product.time_found}
                imageUrl={product.product_image}
                email={product.email}
                productlocation={product.product_location}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))
          )}
        </div>
      </div>
      <NavBar />

      {/* Update Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Update Product</h2>

            <input
              type="text"
              value={selectedProduct.product_name}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  product_name: e.target.value,
                })
              }
              className="w-full p-2 border rounded mb-4"
              placeholder="Product Name"
            />
            <textarea
              value={selectedProduct.product_description}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  product_description: e.target.value,
                })
              }
              className="w-full p-2 border rounded mb-4"
              placeholder="Description"
            />
            <input
              type="date"
              value={selectedProduct.date_found}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  date_found: e.target.value,
                })
              }
              className="w-full p-2 border rounded mb-4"
            />
            <input
              type="time"
              value={selectedProduct.time_found}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  time_found: e.target.value,
                })
              }
              className="w-full p-2 border rounded mb-4"
            />
            <input
              type="text"
              value={selectedProduct.product_location}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  product_location: e.target.value,
                })
              }
              className="w-full p-2 border rounded mb-4"
              placeholder="Product Location"
            />

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setSelectedProduct(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FindPage;

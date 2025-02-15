import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import AutorenewIcon from "@mui/icons-material/Autorenew";

function CollapsibleCard({
  id, // Add id as a prop
  name,
  description,
  foundAt,
  foundOn,
  imageUrl,
  email,
  productlocation,
  productcategory,
  claimed,
  isInventory,
  onUpdate,
  onDelete,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    id, // Include id in the updatedProduct state
    product_name: name, // Use product_name instead of name
    product_description: description, // Use product_description instead of description
    product_location: productlocation,
    product_category: productcategory,
  });
  const limit = 100;
  // console.log(updatedProduct);
  const toggleExpand = () => setIsExpanded(!isExpanded);
  const handleClaimClick = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);
  const sendEmail = () => {
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      "Claiming Lost Product"
    )}&body=${encodeURIComponent(
      "Hello, I am interested in claiming this product."
    )}`;
    window.open(mailtoLink, "_blank");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateClick = () => {
    setShowUpdatePopup(true);
  };

  const handleUpdateSubmit = () => {
    console.log(updatedProduct);
    onUpdate(updatedProduct); // Pass the updatedProduct object with id
    setShowUpdatePopup(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg w-2/3 p-6 mt-5 flex flex-col border border-gray-300">
      <div className="flex items-center">
        <div className="border border-gray-400 rounded-lg overflow-hidden">
          <img
            src={`http://127.0.0.1:8000${imageUrl}`}
            alt="Product"
            className="w-48 h-48 object-cover"
          />
        </div>
        <div className="ml-6 w-2/3">
          <h2 className="text-2xl font-bold mb-2">{name}</h2>
          <p className="text-gray-700 mb-2">
            {isExpanded ? description : `${description.slice(0, limit)}...`}
          </p>
          {description.length > limit && (
            <button
              className="text-blue-600 hover:underline"
              onClick={toggleExpand}
            >
              {isExpanded ? "Show less" : "Read more"}
            </button>
          )}
          <div className="mt-3">
            <p className="text-gray-700">
              <strong>Found:</strong> {foundAt} at {foundOn}
            </p>
            <p className="text-gray-700">
              <strong>Category:</strong> {productcategory}
            </p>
            <p className="text-gray-700">
              <strong>Location:</strong> {productlocation}
            </p>
          </div>
          <div className="mt-3 flex justify-between">
            {isInventory ? (
              <>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md border border-blue-700 hover:bg-blue-600"
                  onClick={handleUpdateClick}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md border border-red-700 hover:bg-red-600"
                  onClick={onDelete}
                >
                  Delete
                </button>
              </>
            ) : (
              <>
                <div>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md border border-green-700 hover:bg-green-600"
                    onClick={handleClaimClick}
                  >
                    Claim Product
                  </button>
                </div>
                <div>
                  <p>
                    Status:{" "}
                    <span
                      className={`font-bold ${
                        claimed === "Claimed"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {claimed}
                    </span>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Popup Modal for Claim Product */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-2">
              Do you want to claim this product?
            </h3>
            <p className="text-gray-700 mb-4">
              Contact: <strong>{email}</strong>
            </p>
            <div className="flex justify-between">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md border border-blue-700 hover:bg-blue-600"
                onClick={sendEmail}
              >
                Send Email
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md border border-red-700 hover:bg-red-600"
                onClick={closePopup}
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup Modal for Update Product */}
      {showUpdatePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Update Product</h3>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Product Name</label>
                <input
                  type="text"
                  name="product_name"
                  value={updatedProduct.product_name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  name="product_description"
                  value={updatedProduct.product_description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Category</label>
                <input
                  type="text"
                  name="product_category"
                  value={updatedProduct.product_category}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Location</label>
                <input
                  type="text"
                  name="product_location"
                  value={updatedProduct.product_location}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md border border-blue-700 hover:bg-blue-600"
                  onClick={handleUpdateSubmit}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded-md border border-red-700 hover:bg-red-600"
                  onClick={() => setShowUpdatePopup(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
function FindPage() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showInventoryPopup, setShowInventoryPopup] = useState(false);
  const [inventoryProducts, setInventoryProducts] = useState({
    reported: [],
    lost: [],
  });
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    try {
      const email = localStorage.getItem("email");
      const response = await fetch("http://127.0.0.1:8000/get-notifications/", {
        headers: {
          email: email,
        },
      });
      const data = await response.json();

      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };
  const deleteNotification = async (notificationId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/delete-notification/${notificationId}/`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Remove the deleted notification from the state
      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification.id !== notificationId
        )
      );
      console.log("Notification deleted successfully");
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };
  useEffect(() => {
    fetchNotifications();
  }, []);
  // Fetch products for the main page
  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      if (!token) navigate("/login");
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

  // Fetch inventory products
  const fetchInventoryProducts = async () => {
    try {
      const email = localStorage.getItem("email");
      const response = await fetch(
        "http://127.0.0.1:8000/view-lost-product/view-inventory/",
        {
          headers: {
            email: email,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setInventoryProducts({
        reported: data.reported_products,
        lost: data.lost_products,
      });
      setShowInventoryPopup(true);
    } catch (error) {
      console.error("Error fetching inventory products:", error);
    }
  };
  const handleUpdateLostProduct = async (updatedProduct) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/update-lost-product-self/${updatedProduct.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      fetchInventoryProducts(); // Refresh the inventory
      console.log("Lost product updated successfully");
    } catch (error) {
      console.error("Error updating lost product:", error);
    }
  };

  const handleDeleteLostProduct = async (productId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/delete-lost-product-self/${productId}/`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setInventoryProducts((prev) => ({
        ...prev,
        lost: prev.reported.filter((product) => product.id !== productId),
      }));
      console.log("Lost product deleted successfully");
    } catch (error) {
      console.error("Error deleting lost product:", error);
    }
  };
  // Handle update button click
  const handleUpdate = async (updatedProduct) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/update-product/${updatedProduct.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );
      // console.log("id is", updatedProduct);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Refresh the inventory products after update
      fetchInventoryProducts();
      console.log("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Handle delete button click
  const handleDelete = async (productId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/delete-product/${productId}/`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setInventoryProducts((prev) => ({
        ...prev,
        reported: prev.reported.filter((product) => product.id !== productId),
      }));
      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const checkForMatches = async () => {
    try {
      const email = localStorage.getItem("email");
      const response = await fetch("http://127.0.0.1:8000/check-for-matches/", {
        headers: {
          email: email,
        },
      });
      const data = await response.json();

      fetchNotifications();
    } catch (error) {
      console.error("Error checking for matches:", error);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const handleInventory = () => {
    fetchInventoryProducts();
  };

  const closeInventoryPopup = () => setShowInventoryPopup(false);

  return (
    <div className="bg-gradient-to-b from-blue-400 to-white min-h-screen flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center p-4 sticky top-0 z-10">
          <div className="flex-grow flex justify-center">
            <input
              type="text"
              className="p-2 border rounded-lg w-1/2"
              placeholder="Search for a product (Enter product name, location, dimensions, etc.)"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={checkForMatches}
            className="bg-green-500 text-white py-2 px-4 mr-3 rounded-lg hover:bg-green-600 transition"
          >
            <AutorenewIcon />
          </button>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="bg-yellow-500 text-white py-2 px-4 mr-3 rounded-lg hover:bg-yellow-600 transition"
          >
            Notifications ({notifications.length})
          </button>
          <button
            onClick={handleInventory}
            className="bg-cyan-700 text-white py-2 px-4 mr-3 rounded-lg hover:bg-cyan-800 transition"
          >
            Inventory
          </button>
          <button
            onClick={handleLogOut}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
        {/* Notification Popup */}
        {showNotifications && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-2xl font-bold mb-4">Notifications</h2>
              {notifications.length === 0 ? (
                <p>No new notifications</p>
              ) : (
                notifications.map((notification) => (
                  <div key={notification.id} className="mb-4">
                    <p>{notification.message}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(notification.created_at).toLocaleString()}
                    </p>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded-md border border-red-700 hover:bg-red-600"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md border border-red-700 hover:bg-red-600"
                onClick={() => setShowNotifications(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

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
                productcategory={product.product_category}
                claimed={product.claim ? "Claimed" : "Not claimed"}
              />
            ))
          )}
        </div>
      </div>
      <NavBar />

      {/* Inventory Popup */}
      {showInventoryPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Inventory</h2>

            {/* Reported Products Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Reported Products</h3>
              <div className="flex flex-col justify-center items-center">
                {inventoryProducts.reported.length === 0 ? (
                  <p>No reported products to display</p>
                ) : (
                  inventoryProducts.reported.map((product) => (
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
                      productcategory={product.product_category}
                      claimed={product.claim ? "Claimed" : "Not claimed"}
                      isInventory={true}
                      onUpdate={handleUpdate}
                      onDelete={() => handleDelete(product.id)}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Lost Products Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">My Lost Products</h3>
              <div className="flex flex-col justify-center items-center">
                {inventoryProducts.lost.length === 0 ? (
                  <p>No lost products to display</p>
                ) : (
                  inventoryProducts.lost.map((product) => (
                    <CollapsibleCard
                      key={product.id}
                      id={product.id}
                      name={product.product_name}
                      description={product.product_description}
                      foundAt={product.date_lost}
                      foundOn={product.time_lost}
                      imageUrl={product.product_image}
                      email={product.email}
                      productlocation={product.product_location}
                      productcategory={product.product_category}
                      isInventory={true}
                      onUpdate={handleUpdateLostProduct}
                      onDelete={() => handleDeleteLostProduct(product.id)}
                    />
                  ))
                )}
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md border border-red-700 hover:bg-red-600"
                onClick={closeInventoryPopup}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FindPage;

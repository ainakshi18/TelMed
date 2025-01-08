import React, { useState, useEffect } from "react";
import StoreNavbar from "../NavBar/StoreNavbar";
import { FaBox, FaReceipt, FaUsers, FaChartLine, FaBell, FaStar } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";

const StoreOwnerDashboard = () => {
  const [stockCount, setStockCount] = useState(150);
  const [pendingOrders, setPendingOrders] = useState(10);
  const [pendingRequests, setPendingRequests] = useState(5);
  const [sales, setSales] = useState(2500);
  const [revenue, setRevenue] = useState(23000);
  const [bestsellingProducts, setBestsellingProducts] = useState([
    { name: "Paracetamol", sales: 500 },
    { name: "Cough Syrup", sales: 300 },
    { name: "Vitamin C", sales: 250 },
  ]);
  const [alerts, setAlerts] = useState([
    "Low stock: Painkillers",
    "Order #123 needs immediate attention",
    "Restock Vitamin C soon (5 left in stock)",
  ]);

  useEffect(() => {
    // Fetch live data from backend/API here
  }, []);

  return (
    <div className="store-dashboard bg-[#F5F7FA] min-h-screen">
      <StoreNavbar />
      <div className="dashboard-content p-8 max-w-screen-xl mx-auto">
        {/* Header Section */}
        <section className="header-section text-center py-10 bg-[#0047AB] text-white rounded-lg shadow-md mb-8">
          <h1 className="text-4xl font-bold">Welcome Back!</h1>
          <p className="text-lg mt-2">Manage your store with ease and track all activities in one place.</p>
        </section>

        {/* Overview Cards */}
        <section className="overview grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Stock Overview Card */}
          <div className="overview-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl border-l-4 border-[#0047AB] transition duration-300">
            <FaBox className="text-4xl text-[#0047AB] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Stock Overview</h3>
            <p className="text-lg text-gray-600">{stockCount} items in stock</p>
            <button className="text-[#0047AB] mt-4 hover:underline">
              View Details
            </button>
          </div>

          {/* Pending Orders Card */}
          <div className="overview-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl border-l-4 border-[#00A36C] transition duration-300">
            <FaReceipt className="text-4xl text-[#00A36C] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Pending Orders</h3>
            <p className="text-lg text-gray-600">{pendingOrders} orders pending</p>
            <button className="text-[#00A36C] mt-4 hover:underline">
              View Details
            </button>
          </div>

          {/* Pending Requests Card */}
          <div className="overview-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl border-l-4 border-[#FFC107] transition duration-300">
            <FaUsers className="text-4xl text-[#FFC107] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Pending Requests</h3>
            <p className="text-lg text-gray-600">{pendingRequests} requests pending</p>
            <button className="text-[#FFC107] mt-4 hover:underline">
              View Details
            </button>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="stats grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {/* Sales Card */}
          <div className="stat-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl border-l-4 border-[#0047AB] transition duration-300">
            <FaChartLine className="text-4xl text-[#0047AB] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sales</h3>
            <p className="text-lg text-gray-600">${sales}</p>
            <button className="text-[#0047AB] mt-4 hover:underline">
              View Details
            </button>
          </div>

          {/* Revenue Card */}
          <div className="stat-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl border-l-4 border-[#00A36C] transition duration-300">
            <FaChartLine className="text-4xl text-[#00A36C] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Revenue</h3>
            <p className="text-lg text-gray-600">${revenue}</p>
            <button className="text-[#00A36C] mt-4 hover:underline">
              View Details
            </button>
          </div>
        </section>

        {/* Alerts Section */}
        <section className="alerts mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">Alerts</h3>
          <ul className="list-disc pl-6 space-y-2 text-lg text-gray-600">
            {alerts.map((alert, index) => (
              <li key={index} className="flex items-center">
                <FaBell className="text-[#FF6F61] mr-2" />
                {alert}
              </li>
            ))}
          </ul>
        </section>

        {/* Bestselling Products */}
        <section className="bestselling-products mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">Bestselling Products</h3>
          <ul className="list-disc pl-6 space-y-2 text-lg text-gray-600">
            {bestsellingProducts.map((product, index) => (
              <li key={index} className="flex items-center">
                <FaStar className="text-[#FFC107] mr-2" />
                {product.name} - {product.sales} sold
              </li>
            ))}
          </ul>
        </section>

        {/* Quick Actions */}
        <section className="quick-actions grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          <div className="quick-action bg-[#0047AB] text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <IoIosAddCircle className="text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Add New Product</h3>
            <button className="text-white underline mt-4">Add Product</button>
          </div>

          <div className="quick-action bg-[#00A36C] text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <IoIosAddCircle className="text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Manage Inventory</h3>
            <button className="text-white underline mt-4">Manage Inventory</button>
          </div>

          <div className="quick-action bg-[#FFC107] text-black p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <IoIosAddCircle className="text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Manage Orders</h3>
            <button className="text-black underline mt-4">Manage Orders</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StoreOwnerDashboard;

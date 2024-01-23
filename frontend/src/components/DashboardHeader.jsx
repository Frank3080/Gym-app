import React from "react";
import { Link, useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // For example, if you are using localStorage to store the token
    localStorage.removeItem("authToken");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between gap-4 p-4">
      <Link to="/">
        <h1 className="font-medium">
          Jacked<span className="text-purple-600 bold">Fit</span>
        </h1>
      </Link>
      <div className="flex flex-col items-center justify-center">
        <p className="mb-2">Welcome Back!</p>
        <p className="flex items-center gap-2 specialBtn px-3 py-2 rounded-lg text-purple-400 cursor-pointer">
          Whats to do today?
        </p>
      </div>
      <div className="gap-4 flex items-center">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 specialBtn px-3 py-2 rounded-lg text-purple-600 cursor-pointer"
        >
          <p>Logout</p>
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;

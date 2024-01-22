import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-between gap-4 p-4">
      <Link to="/">
        <h1 className="font-medium">
          Jacked<span className="text-purple-600 bold">Fit</span>
        </h1>
      </Link>
      <div className="gap-4 flex items-center ">
        <Link
          to="/login"
          className="flex items-center gap-2 specialBtn px-3 py-2 rounded-lg text-purple-600"
        >
          <p>Login</p>
        </Link>
      </div>
    </header>
  );
};

export default Header;

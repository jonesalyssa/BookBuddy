/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../index.css";

const NavBar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav>
      <ul>
        <button className="navigation" onClick={() => navigate("/Account")}>
          My Account
        </button>
        <button className="navigation" onClick={() => navigate("/Books")}>
          Library Books
        </button>
        <button className="navigation" onClick={() => navigate("/Checkout")}>
          Cart
        </button>

        {isAuthenticated ? (
          <button className="navigation" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <button className="navigation" onClick={() => navigate("/Login")}>
              Login
            </button>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;

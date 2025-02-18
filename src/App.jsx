import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import store from "./data/store";
import Books from "./components/Books";
import SingleBook from "./components/SingleBook";
import Login from "./components/Login";
import Register from "./components/Register";
import NavBar from "./components/Nav";
import Checkout from "./components/Checkout";
import Account from "./components/Account";
import "./index.css";
import booksImage from "./assets/books.png";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div>
          <div className="header">
            <h1>Book Buddy</h1>
            <img src={booksImage} alt="Books" className="books-header-image" />
          </div>
          <NavBar />
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  isAuthenticated ? (
                    <Books />
                  ) : (
                    <Login setIsAuthenticated={setIsAuthenticated} />
                  )
                }
              />
              <Route
                path="/login"
                element={<Login setIsAuthenticated={setIsAuthenticated} />}
              />
              <Route path="/register" element={<Register />} />
              <Route path="/books" element={<Books />} />
              <Route path="/books/:id" element={<SingleBook />} />
              <Route
                path="/checkout"
                element={
                  isAuthenticated ? (
                    <Checkout />
                  ) : (
                    <Login setIsAuthenticated={setIsAuthenticated} />
                  )
                }
              />
              <Route
                path="/account"
                element={
                  isAuthenticated ? (
                    <Account />
                  ) : (
                    <Login setIsAuthenticated={setIsAuthenticated} />
                  )
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

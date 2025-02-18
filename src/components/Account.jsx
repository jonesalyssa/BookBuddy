/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const [user, setUser] = useState(null);
  const [checkedOutBooks, setCheckedOutBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const storedEmail = localStorage.getItem("userEmail");
    const storedName = localStorage.getItem("userName");
    if (storedEmail && storedName) {
      setUser({ name: storedName, email: storedEmail });
    }

    const storedBooks =
      JSON.parse(localStorage.getItem("checkedOutBooks")) || [];
    setCheckedOutBooks(storedBooks);
  }, [navigate]);

  const handleReturnBook = (bookIndex) => {
    const updatedBooks = checkedOutBooks.filter(
      (_, index) => index !== bookIndex
    );
    setCheckedOutBooks(updatedBooks);
    localStorage.setItem("checkedOutBooks", JSON.stringify(updatedBooks));
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Account Details</h2>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <h3>Checked-Out Books</h3>
      {checkedOutBooks.length === 0 ? (
        <p>No books checked out.</p>
      ) : (
        checkedOutBooks.map((book, index) => (
          <div key={index}>
            <p>
              {book.title} by {book.author}
            </p>
            <button onClick={() => handleReturnBook(index)}>Return Book</button>
          </div>
        ))
      )}

      <button
        onClick={() => {
          localStorage.removeItem("isAuthenticated");
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}

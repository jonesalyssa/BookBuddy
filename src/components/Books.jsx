/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */

import { useState } from "react";
import { useGetBooksQuery } from "../data/api";
import { Link } from "react-router-dom";
import "../index.css";

export default function Books() {
  const { data, error, isLoading } = useGetBooksQuery();
  const [search, setSearch] = useState("");

  const books = Array.isArray(data?.books) ? data.books : [];

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  if (error) return <p>Error loading books: {error.message}</p>;
  if (isLoading) return <p>Loading books...</p>;

  return (
    <article>
      <h1>Library Books</h1>
      <input
        type="text"
        placeholder="Search for a book"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredBooks.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div className="grid">
          {filteredBooks.map((book) => (
            <figure key={book.id} className="book-item">
              <img
                src={book.coverimage}
                alt={book.title}
                className="book-image"
              />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <Link to={`/books/${book.id}`}>View Details</Link>
            </figure>
          ))}
        </div>
      )}
    </article>
  );
}

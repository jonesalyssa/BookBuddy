import { useParams } from "react-router-dom";
import { useGetBookQuery } from "../data/api";
import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice";
import { useNavigate } from "react-router-dom";
import "../index.css";

const SingleBook = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetBookQuery(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("Book ID from route:", id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleAddToCart = () => {
    if (data?.book) {
      dispatch(addToCart(data.book));
      navigate("/checkout");
    }
  };

  return (
    <div>
      <div className="Single">
        <h2>{data?.book?.title || "Book Not Found"}</h2>
        {data?.book ? (
          <div className="book-details">
            <img
              src={data.book.coverimage}
              alt={data.book.title}
              className="book-image"
            />
            <p>
              <strong> {data.book.author}</strong>
            </p>
            <p>{data.book.description}</p>

            <button
              onClick={handleAddToCart}
              disabled={!data.book.available}
              className="add-to-cart-button"
            >
              {data.book.available ? "Add to Cart" : "Unavailable"}
            </button>
          </div>
        ) : (
          <p>Book not found.</p>
        )}
      </div>
    </div>
  );
};

export default SingleBook;

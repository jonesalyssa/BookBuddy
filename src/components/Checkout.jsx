import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "./cartSlice";
import "../index.css";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const storedBooks =
      JSON.parse(localStorage.getItem("checkedOutBooks")) || [];

    const updatedCheckedOutBooks = [...storedBooks, ...cartItems];

    localStorage.setItem(
      "checkedOutBooks",
      JSON.stringify(updatedCheckedOutBooks)
    );

    alert("Books checked out successfully!");

    dispatch(clearCart());
    navigate("/account");
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="cart-content">
        {cartItems.length > 0 ? (
          <div className="cart-items">
            <h3>Your Cart</h3>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  {item.title} by {item.author}
                </li>
              ))}
            </ul>
            <button onClick={handleCheckout} className="checkout-button">
              Checkout
            </button>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Checkout;

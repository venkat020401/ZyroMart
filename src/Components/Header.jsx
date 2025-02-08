import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Header = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const cartItemCount = cart.length;

  return (
    <header
      className="py-2 sticky-top bg-dark text-white p-0 m-0"
      style={{ height: "70px" }}
    >
      <div className="container h-100">
        <div className="row h-100 d-flex align-items-center">
          <div className="col-4 d-flex align-items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPcz2K9O1pF7ZxVTtVX6Ypd9eDj3jGy0eyt_fSKHBZiyo56svug2ubosiKcBi2IeMAsPo&usqp=CAU"
              alt="Realme Logo"
              className="logo rounded-circle"
              width={50}

              onClick={() => navigate(`/`)}
            />
          </div>
          <div className="col-4 d-flex align-items-center justify-content-center">
            <h2 className="m-0">ZyroMart</h2>
          </div>
          <div className="col-4 d-flex align-items-center justify-content-end position-relative">
            <i
              className="bi bi-cart3 fs-4 cart-button"
              onClick={() => navigate(`/cart`)}
            ></i>
            {cartItemCount > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger"
                style={{ fontSize: "0.75rem" }}
              >
                {cartItemCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

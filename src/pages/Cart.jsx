import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, increaseQty, decreaseQty, removeFromCart, placeOrder } =
    useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    placeOrder();
    navigate("/orders");
  };
  const totalItems = cart.reduce((total, item) => total + item.qty, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.sellingPrice * item.qty,
    0
  );

  const discount = totalPrice > 0 ? totalPrice * 0.01 : 0;

  const deliveryCharge = totalPrice > 500 ? 0 : totalPrice > 0 ? 40 : 0;

  const packagingFee = totalPrice > 0 ? 58 : 0;

  const finalTotal = totalPrice - discount + deliveryCharge + packagingFee;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <div
            className="bg-white p-3 mb-0 sticky-top"
            style={{ top: "0px", zIndex: "10" }}
          >
            <h5 className="fw-bold m-0">Cart Items</h5>
            <hr></hr>
          </div>
          <div className="cart-items-container">
            {cart.length === 0 ? (
              <p className="text-muted text-center">Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  style={{cursor:'pointer'}}
                  className="border p-3 mb-3 bg-white rounded shadow-sm h-card card"
                  onClick={() =>
                    navigate(`/product-details/${item.categoryID}/${item.id}`)
                  }
                >
                  <div className="d-flex align-items-start">
                    <div className="d-flex flex-column align-items-center">
                      <img
                        src={item.image}
                        className="rounded mb-2 img-fluid"
                        style={{
                          maxWidth: "90px",
                          height: "90px",
                          objectFit: "contain",
                        }}
                      />
                    </div>

                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-1">{item.name}</h6>
                      <p className="text-muted mb-0">Brand: {item.brand}</p>

                      <p className="fw-bold mt-2 fs-6">
                        ₹{" "}
                        {(item.sellingPrice * item.qty).toLocaleString("en-IN")}
                        <span
                          className="text-muted"
                          style={{ fontSize: "12px" }}
                        >
                          &nbsp; {item.qty} No's
                        </span>
                      </p>

                      <div className="d-flex align-items-center justify-content-between mt-2">
                        <div className="d-flex align-items-center">
                          <button
                            className={`btn btn-outline-secondary btn-sm rounded-circle p-1 d-flex align-items-center justify-content-center  ${item.qty == 1 ? "disabled" : ""}`}
                            style={{
                              width: "24px",
                              height: "24px",
                              fontSize: "12px",
                            }}
                            onClick={(event) => {
                              event.stopPropagation();
                              decreaseQty(item.id);
                            }}
                          >
                            -
                          </button>
                          <span
                            className="mx-2 border px-3 py-0 rounded text-center d-inline-block"
                            style={{
                              minWidth: "26px",
                              fontSize: "14px",
                              lineHeight: "24px",
                            }}
                          >
                            {item.qty}
                          </span>
                          <button
                            className="btn btn-outline-primary btn-sm rounded-circle p-1 d-flex align-items-center justify-content-center"
                            style={{
                              width: "24px",
                              height: "24px",
                              fontSize: "12px",
                            }}
                            onClick={(event) => {
                              event.stopPropagation();
                              increaseQty(item.id)
                            }}
                            
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="btn text-danger fw-bold px-0 d-flex align-items-center"
                          onClick={(event) => {
                            event.stopPropagation();
                            removeFromCart(item.id);
                          }}
                        
                        >
                          <i
                            className="bi bi-trash me-1"
                            style={{ fontSize: "14px" }}
                          ></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="col-md-4">
          <div
            className="border p-3 bg-white rounded shadow-sm sticky-top"
            style={{ top: "100px" }}
          >
            <h6 className="mb-3 fw-bold">PRICE DETAILS</h6>
            <div className="d-flex justify-content-between mb-2">
              <span>Price ({totalItems} items)</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>
            <div className="d-flex justify-content-between text-success mb-2">
              <span>Discount</span>
              <span>- ₹{discount.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Delivery Charges</span>
              <span className={deliveryCharge === 0 ? "text-success" : ""}>
                {deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}
              </span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Secured Packaging Fee</span>
              <span>₹{packagingFee}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold fs-6">
              <span>Total Amount</span>
              <span>₹{finalTotal.toLocaleString()}</span>
            </div>
            <p className="text-success mt-2 small">
              You will save ₹{(discount + deliveryCharge).toFixed(2)} on this
              order
            </p>

            <div className="border-top pt-3 mt-3">
              <p className="text-muted small">
                <i className="bi bi-shield-lock"></i> Safe and Secure Payments.
                Easy returns. 100% Authentic products.
              </p>
            </div>
            {cart.length > 0 && (
              <div className="d-flex justify-content-end mt-3">
                <button
                  className="btn btn-warning fw-bold px-4 py-2"
                  onClick={handlePlaceOrder}
                >
                  PLACE ORDER
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

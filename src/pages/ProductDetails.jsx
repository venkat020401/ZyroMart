import React from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import productsList from "../Assets/data.json";

const ProductDetail = () => {
  const { categoryID, productID } = useParams();
  const { addToCart, increaseQty, decreaseQty, removeFromCart, cart } =
    useCart();

  const Category = productsList.find((item) => item.categoryID === categoryID);
  const product = Category?.products.find((item) => item.id === productID);

  if (!product) {
    return (
      <div className="container mt-4 text-center text-danger">
        Product not found!
      </div>
    );
  }

  const cartItem = cart.find((item) => item.id === product.id);

  return (
    <div className="container mt-4">
      <div className="row d-flex flex-column flex-md-row gap-5 gy-4 gy-md-5 mt-5">
        <div className="col-12 col-md-5 d-flex justify-content-center p-4 border">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded"
            style={{ maxWidth: "400px", objectFit: "contain" }}
          />
        </div>

        <div className="col-12 col-md-6">
          <h4 className="fw-bold">{product.name}</h4>
          <p className="text-muted">Brand: {product.brand}</p>

          <h5 className="fw-bold text-danger">
            ₹{product.sellingPrice.toLocaleString("en-IN")}
            {product.price > product.sellingPrice && (
              <>
                <span className="text-muted text-decoration-line-through ms-2">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {/* <span className="text-success ms-2">
                  ({product.discount}% off)
                </span> */}
              </>
            )}
          </h5>

          <p className="mt-3">{product.description}</p>

          <h6 className="fw-bold mt-3">Specifications:</h6>
          <ul className="list-unstyled">
            {Object.entries(product.specification).map(([key, value]) => (
              <li key={key} className="text-muted mb-1">
                <span className="text-dark">
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                  :&nbsp;
                </span>
                {value}
              </li>
            ))}
          </ul>

          <div
            className="d-flex align-items-center mt-3"
            style={{ minHeight: "40px" }}
          >
            {cartItem ? (
              <div className="d-flex align-items-center">
                {cartItem.qty > 1 ? (
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => decreaseQty(product.id)}
                  >
                    -
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => removeFromCart(product.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                )}
                <span className="mx-2">{cartItem.qty}</span>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => increaseQty(product.id)}
                >
                  +
                </button>
              </div>
            ) : (
              <button
                className="btn btn-secondary"
                style={{ minHeight: "40px" }} 
                onClick={() => addToCart(product)}
              >
                <i className="bi bi-cart-plus-fill me-2"></i> Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

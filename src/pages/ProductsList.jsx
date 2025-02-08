import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productsList from "../Assets/data.json";
import { useCart } from "../context/CartContext";

function ProductsList() {
  const params = useParams();
  const navigate = useNavigate();
  const { cart, addToCart, increaseQty, decreaseQty, removeFromCart } =
    useCart();
  const [IsProducts, SetProducts] = useState([]);

  useEffect(() => {
    const filteredCategory = productsList.find(
      (item) => item.categoryID === params.id
    );
    SetProducts(filteredCategory ? filteredCategory : []);
  }, [params.id]);
  return (
    <div className="container mt-4 mb-4">
      <h3 className="fw-bold">{IsProducts.category}</h3>
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3 mt-3">
        {IsProducts.products &&
          IsProducts.products.map((product) => {
            const cartItem = cart.find((item) => item.id === product.id);
            const discount = Math.round(
              ((product.originalPrice - product.price) /
                product.originalPrice) *
                100
            );
            console.log(product);
            return (
              <div className="col" key={product.id}>
                <div
                  className="card h-card h-100 p-2 border-0 shadow-sm position-relative"
                  onClick={() =>
                    navigate(`/product-details/${params.id}/${product.id}`)
                  }
                >
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ height: "180px" }}
                  >
                    <img
                      src={product.image}
                      className="img-fluid"
                      alt={product.name}
                      style={{ objectFit: "contain", maxHeight: "100%" }}
                    />
                  </div>

                  <div className="card-body p-0 mt-2">
                    <p
                      className="text-muted m-0 fw-bold"
                      style={{ fontSize: "13px" }}
                    >
                      {product.brand}
                    </p>
                    <p
                      className="text-truncate fw-normal mb-1"
                      style={{
                        maxWidth: "100%",
                        lineHeight: "1.2em",
                        maxHeight: "2.4em",
                        overflow: "hidden",
                      }}
                    >
                      {product.name}
                    </p>
                    <p className="text-muted mb-1" style={{ fontSize: "13px" }}>
                      {product.description.length > 50
                        ? `${product.description.substring(0, 50)}...`
                        : product.description}
                    </p>
                    <p className="fw-bold text-dark m-0">
                      ₹ {product.sellingPrice.toLocaleString("en-IN")}
                      &nbsp;&nbsp;
                      {product.price && (
                        <>
                          <span
                            className="text-decoration-line-through text-muted mx-1"
                            style={{ fontSize: "13px" }}
                          >
                            ₹ {product.price.toLocaleString("en-IN")}
                          </span>
                        </>
                      )}
                    </p>
                    <div className="mt-2">
                      {cartItem ? (
                        <div className="d-flex">
                          {cartItem.qty > 1 ? (
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={(event) => {
                                event.stopPropagation();
                                decreaseQty(product.id);
                              }}
                            >
                              -
                            </button>
                          ) : (
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={(event) => {
                                event.stopPropagation();
                                removeFromCart(product.id);
                              }}
                            >
                              <i className="bi bi-trash f-1"></i>
                            </button>
                          )}
                          <span className="mx-2">{cartItem.qty}</span>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={(event) => {
                              event.stopPropagation();
                              increaseQty(product.id);
                            }}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          className="btn btn-secondary btn-sm mt-2"
                          onClick={(event) => {
                            event.stopPropagation();
                            addToCart(product);
                          }}
                        >
                          <i className="bi bi-cart-plus-fill"></i>&nbsp;Add to
                          Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ProductsList;

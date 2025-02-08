import React from "react";
import Categories from "../Assets/data.json";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className="container mt-4">
        <h3 className="text-center">Select Category</h3>
        <p className="text-center text-muted  mb-4 mb-md-5">
          Choose the category that matches your interest and discover amazing
          products!
        </p>
        <div className="row mt-4">
          {Categories &&
            Categories.map((cat) => (
              <div
                className="col-lg-2 col-md-3 col-sm-4 col-6 mb-5"
                key={cat.categoryID}
              >
                <div
                  className="card h-100 h-card"
                  onClick={() => navigate(`/products-list/${cat.categoryID}`)}
                >
                  <img
                    src={cat.category_img}
                    className="card-img-top"
                    alt={cat.category}
                    style={{ objectFit: "cover" }}
                  />
                  <hr className="my-2" />
                  <div className="card-body text-center p-0">
                    <h6 className="card-title">{cat.category}</h6>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Home;

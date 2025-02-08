import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Header from "../Components/Header";

const Home = lazy(() => import("../pages/Home"));
const ProductsList = lazy(() => import("../pages/ProductsList"));
const Cart = lazy(() => import("../pages/Cart"));
const Orders = lazy(() => import("../pages/Orders"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));

const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products-list/:id" element={<ProductsList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/product-details/:categoryID/:productID" element={<ProductDetails />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;

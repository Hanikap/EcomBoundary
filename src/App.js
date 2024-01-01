import React from "react";
import { Route, Routes } from "react-router-dom";
import HeaderComponent from "./Components/HeaderComponent";
import FooterComponent from "./Components/FooterComponent";
import ProtectedRoute from "./Components/ProtectedRoutes";
import withSuspense from "./Components/WithSuspense";

// Lazy-loaded components withSuspense
const HomeWithSuspense = withSuspense(() => import("./Components/Home"));
const CartAndWishlistWithSuspense = withSuspense(() => import("./Components/CartAndWishlist"));
const ShopWithSuspense = withSuspense(() => import("./Components/Shop"));
const CompareWithSuspense = withSuspense(() => import("./Components/Compare"));
const CategoryWithSuspense = withSuspense(() => import("./Components/Category"));
const RegistrationFormWithSuspense = withSuspense(() => import("./Components/RegistrationForm"));
const LoginFormWithSuspense = withSuspense(() => import("./Components/LoginForm"));
const SearchComponentWithSuspense = withSuspense(() => import("./Components/SearchComponent"));

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<HomeWithSuspense />} />
        <Route path="/cart" element={<CartAndWishlistWithSuspense type="cart" />} />
        <Route path="/wishlist" element={<CartAndWishlistWithSuspense type="wishlist" />} />
        <Route path="/shop" element={<ProtectedRoute Component={ShopWithSuspense} />} />
        <Route path="/category" element={<ProtectedRoute Component={CategoryWithSuspense} />} />
        <Route path="/compare" element={<ProtectedRoute Component={CompareWithSuspense} />} />
        <Route path="/registrationform" element={<RegistrationFormWithSuspense />} />
        <Route path="/login" element={<LoginFormWithSuspense />} />
        <Route path="/searchcomponent" element={<SearchComponentWithSuspense />} />
      </Routes>
      <FooterComponent />
    </div>
  );
}

export default App;

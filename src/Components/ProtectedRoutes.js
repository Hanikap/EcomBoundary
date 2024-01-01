import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = (props) => {
  const { Component } = props;

  const navigate = useNavigate();
  useEffect(() => {
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  });

  return (
    <div>
      <Component />
    </div>
  );
};

export default ProtectedRoutes;

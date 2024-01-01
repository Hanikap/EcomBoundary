import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import SearchComponent from "./SearchComponent";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import PriceSlider from "./PriceSlider"

const HeaderComponent = () => {
  const productss = useSelector((state) => state.Product.products);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [cartQuantity, setCartQuantity] = useState("");
  const [wishlistQuantity, setWishlistQuantity] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 300]);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    setLoggedInUser(user);
    // eslint-disable-next-line
  }, [localStorage.getItem("loggedInUser")]);

  const handleSearchChange = (newSearchQuery) => {
    setSearchQuery(newSearchQuery);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  const updateCartQuantity = () => {
    setCartQuantity(productss.filter((product) => product.isAddedToCart).length);
  };

  const updateWishlistQuantity = () => {
    setWishlistQuantity(productss.filter((product) => product.isWishlist).length);
  };

  useEffect(() => {
    updateCartQuantity();
    // eslint-disable-next-line
  }, [productss]);

  useEffect(() => {
    updateWishlistQuantity();
    // eslint-disable-next-line
  }, [productss]);

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" component="div">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              {" "}
              Ecommerce Store
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
            <SearchComponent searchQuery={searchQuery} onSearchChange={handleSearchChange} />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PriceSlider value={priceRange} onChange={handlePriceChange} />

            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Home
            </Link>
            <Button component={Link} to="/cart" color="inherit">
              <ShoppingCartIcon />
              {cartQuantity > 0 && (
                <span
                  style={{
                    marginLeft: "5px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {cartQuantity}
                </span>
              )}
            </Button>
            <Button component={Link} to="/wishlist" color="inherit">
              <VolunteerActivismIcon />
              {wishlistQuantity > 0 && (
                <span
                  style={{
                    marginLeft: "5px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {wishlistQuantity}
                </span>
              )}
            </Button>

            {isLoggedIn ? (
              <>
                <Button component={Link} to="/shop" color="inherit">
                  Shop
                </Button>
                <Button component={Link} to="/category" color="inherit">
                  Categories
                </Button>
                <Button component={Link} to="/compare" color="inherit">
                  Compare
                </Button>
                <Typography variant="h6" component="div" sx={{ marginLeft: "10px", cursor: "pointer" }}>
                  {loggedInUser && loggedInUser.username
                    ? loggedInUser.username.charAt(0)
                    : ""}
                </Typography>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button component={Link} to="/login" color="inherit">
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default HeaderComponent;

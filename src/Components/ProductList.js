import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { add, update } from "../Redux/Slicer/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Button, CardActions } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CustomModal from "./CustomModal";
import { useNavigate } from "react-router-dom";
import { Utils } from "../Utils/Utils";

const ProductList = () => {
  const dispatch = useDispatch();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const productss = useSelector((state) => state.Product.products);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const searchQuery = useSelector((state) => state.search.searchQuery);
 // const [filteredProducts, setFilteredProducts] = useState([]);
  const priceRange = useSelector((state) => state.price.priceRange);

  // useEffect(() => {
  //   if (productss.length === 0) {
  //     getProducts();
  //   } else {
  //     setLoading(false);
  //   }
  //   //eslint-disable-next-line
  // }, [productss]);


  
  const fetchProducts = useCallback(() => {
    axios
      .get(`${Utils}/products`)
      .then((response) => {
        const productsWithProperties = response.data.map((product) => ({
          ...product,
          isAddedToCart: false,
          quantity: 0,
          stock: Math.floor(Math.random() * 10),
          isCompare: false,
          isWishlist: false,
        }));
        dispatch(add(productsWithProperties));
        setLoading(false);
      })
      .catch((err) => {
        console.log("This is error", err);
        setLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    if (productss.length === 0) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [fetchProducts, productss]);


  /**
 * Memoized function that filters products based on search query and price range.
 *
 * @function
 * @name filteredProducts
 * @memberOf YourComponent
 * @returns {Array} An array of products that match the search query and fall within the specified price range.
 * @param {string} searchQuery - The search query used to filter products by title and category.
 * @param {Array<number>} priceRange - The price range used to filter products.
 * @param {Array} productss - The array of products to be filtered.
 */
  const filteredProducts = useMemo(() => {
    const lowerCaseQuery = (searchQuery || "").toLowerCase();
    const filteredBySearch = productss.filter((product) => {
      return (
        product.title.toLowerCase().includes(lowerCaseQuery) ||
        product.category.toString().includes(lowerCaseQuery)
      );
    });

    const filteredByPrice = filteredBySearch.filter((product) => {
      const productPrice = parseInt(product.price);
      return productPrice >= priceRange[0] && productPrice <= priceRange[1];
    });

    return filteredByPrice;
  }, [searchQuery, priceRange, productss]);

  // useEffect(() => {
  //   const lowerCaseQuery = (searchQuery || "").toLowerCase();
  //   const filteredBySearch = productss.filter((product) => {
  //     return (
  //       product.title.toLowerCase().includes(lowerCaseQuery) ||
  //       product.category.toString().includes(lowerCaseQuery)
  //     );
  //   });
  //   setFilteredProducts(filteredBySearch);
  // }, [searchQuery, productss]);

  
  // useEffect(() => {
  //   const filteredByPrice = productss.filter((product) => {
  //     const productPrice = parseInt(product.price);
  //     return productPrice >= priceRange[0] && productPrice <= priceRange[1];
  //   });
  //   setFilteredProducts(filteredByPrice);
  // }, [priceRange, productss]);

  // const getProducts = () => {
  //   axios
  //     .get(`${Utils}/products`)
  //     .then((response) => {
  //       const productsWithProperties = response.data.map((product) => ({
  //         ...product,
  //         isAddedToCart: false,
  //         quantity: 0,
  //         stock: Math.floor(Math.random() * 10),
  //         isCompare: false,
  //         isWishlist: false,
  //       }));
  //       dispatch(add(productsWithProperties));
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log("This is error", err);
  //       setLoading(false);
  //     });
  // };


  /**
 * Adds an item to the cart by updating the quantity and 'isAddedToCart' flag in the Redux store.
 *
 * @function
 * @name addItemToCart
 * @memberof YourComponent
 * @param {Object} product - The product to be added to the cart.
 * @returns {void}
 */
  const addItemToCart = (product) => {
    const updatedProducts = productss.map((p) => {
      if (p.id === product.id) {
        return {
          ...p,
          isAddedToCart: true,
          quantity: p.quantity + 1,
        };
      }
      return p;
    });
    dispatch(update(updatedProducts));
  };


  /**
 * Removes an item from the cart by updating the quantity in the Redux store.
 *
 * @function
 * @name removeItemFromCart
 * @memberof YourComponent
 * @param {Object} product - The product to be removed from the cart.
 * @returns {void}
 */
  const removeItemFromCart = (product) => {
    const updatedProducts = productss.map((p) => {
      if (p.id === product.id && p.quantity > 0) {
        return {
          ...p,
          quantity: p.quantity - 1,
        };
      }
      return p;
    });
    dispatch(update(updatedProducts));
  };


  /**
 * Marks a product for comparison by setting the 'isCompare' flag in the Redux store.
 *
 * @function
 * @name compareProduct
 * @memberof YourComponent
 * @param {Object} product - The product to be marked for comparison.
 * @returns {void}
 */
  const compareProduct = (product) => {
    const updatedProducts = productss.map((p) => {
      if (p.id === product.id) {
        return {
          ...p,
          isCompare: true,
        };
      }
      return p;
    });
    dispatch(update(updatedProducts));
  };

  
/**
 * Toggles the wishlist status of a product by updating the 'isWishlist' flag in the Redux store.
 *
 * @function
 * @name handleWishlistToggle
 * @memberof YourComponent
 * @param {Object} product - The product for which the wishlist status is toggled.
 * @returns {void}
 */
  const handleWishlistToggle = (product) => {
    const updatedProducts = productss.map((p) => {
      if (p.id === product.id) {
        return {
          ...p,
          isWishlist: !p.isWishlist,
        };
      }
      return p;
    });
    dispatch(update(updatedProducts));
  };


  /**
 * Opens a modal with details of a product.
 *
 * @function
 * @name handelOpen
 * @memberof YourComponent
 * @param {Object} product - The product for which the modal is opened.
 * @returns {void}
 */
  const handelOpen = (product) => {
    setModalData(product);
    setOpen(true);
  };


  /**
 * Closes the modal.
 *
 * @function
 * @name handelClose
 * @memberof YourComponent
 * @returns {void}
 */
  const handelClose = () => {
    setOpen(false);
    setModalData(null);
  };

  return (
    <>
      <Grid container spacing={2}>
        {loading ? (
          <Grid item xs={12} align="center">
            <CircularProgress />
          </Grid>
        ) : (
          filteredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardMedia
                  component="img"
                  alt={product.title}
                  height="200"
                  image={product.image}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    style={{ fontSize: "14px", color: "#e1681e" }}
                  >
                    {product.title}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6">₹{product.price}</Typography>
                  </div>
                </CardContent>
                <CardActions>
                  {product.isAddedToCart ? (
                    <>
                      <Button
                        variant="contained"
                        onClick={() => removeItemFromCart(product)}
                      >
                        -
                      </Button>
                      {product.quantity}
                      <Button
                        variant="contained"
                        onClick={() => addItemToCart(product)}
                      >
                        +
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => addItemToCart(product)}
                    >
                      <ShoppingCartIcon />
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={() => compareProduct(product)}
                    style={{
                      backgroundColor: product.isCompare ? "#ffcc00" : "",
                      color: product.isCompare ? "#000" : "",
                    }}
                  >
                    <CompareArrowsIcon />
                  </Button>
                  <Button
                    variant="contained"
                    className={`icon-button`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Wishlist"
                    onClick={() => handleWishlistToggle(product)}
                    style={{
                      backgroundColor: product.isWishlist ? "#ffcc00" : "",
                      color: product.isWishlist ? "#000" : "",
                    }}
                  >
                    <VolunteerActivismIcon />
                  </Button>
                  <Button
                    variant="contained"
                    className={`icon-button`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="info"
                    onClick={() => {
                      if (isLoggedIn) {
                        handelOpen(product);
                      } else {
                        navigate("/login");
                      }
                    }}
                  >
                    <ErrorOutlineIcon />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
        <CustomModal open={open} onClose={handelClose} data={modalData} />
      </Grid>
    </>
  );
};

export default ProductList;

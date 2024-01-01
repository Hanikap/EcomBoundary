import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { update } from "../Redux/Slicer/ProductSlice"

const CartAndWishlist = ({ type }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state?.Product?.products) || [];


  /**
 * Filters the list of products based on the specified type (cart or wishlist).
 *
 * @function
 * @name filterItems
 * @memberof CartAndWishlist
 * @param {string} type - The type of the items to filter, either "cart" or "wishlist".
 * @param {Array<Object>} products - The list of products to filter.
 * @returns {Array<Object>} The filtered list of products.
 */
  const filteredItems =
    type === "cart"
      ? products.filter((product) => product.isAddedToCart)
      : products.filter((product) => product.isWishlist);


      /**
 * Updates the list of products based on the specified product and type (cart or wishlist).
 * Toggles isAddedToCart and isWishlist flags, adjusts quantity, and dispatches the updated list.
 *
 * @function
 * @name updateList
 * @memberof CartAndWishlist
 * @param {Object} product - The product to be updated.
 * @param {string} product.id - The unique identifier of the product.
 * @param {boolean} product.isAddedToCart - Flag indicating whether the product is added to the cart.
 * @param {boolean} product.isWishlist - Flag indicating whether the product is in the wishlist.
 * @param {number} product.quantity - The quantity of the product.
 * @returns {void}
 */
      const updateList = (product) => {
        const updatedProducts = products.map((item) => {
          if (item.id === product.id) {
            return {
              ...item,
              isAddedToCart: type === "cart" ? !item.isAddedToCart : true,
              isWishlist: type === "wishlist" ? !item.isWishlist : false,
              quantity: type === "wishlist" ? (item.isAddedToCart ? item.quantity + 1 : 1) : item.quantity,
            };
          }
          return item;
        });
        dispatch(update(updatedProducts));
      };

      /**
       * Calculates the total cost of items in the filtered list by multiplying each item's price
       * with its quantity and summing up the results.
       *
       * @function
       * @name calculateTotal
       * @memberof CartAndWishlist
       * @returns {number} The total cost of items in the filtered list.
       */      
      

  const calculateTotal = () => {
    return filteredItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        {type === "cart" ? "Shopping Cart" : "Wishlist"}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              {type === "cart" && <TableCell align="right">Quantity</TableCell>}
              {type === "cart" && <TableCell align="right">Total</TableCell>}
              {type === "wishlist" && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell align="right">${item.price}</TableCell>
                {type === "cart" && (
                  <TableCell align="right">{item.quantity}</TableCell>
                )}
                {type === "cart" && (
                  <TableCell align="right">
                    ${item.price * item.quantity}
                  </TableCell>
                )}
                {type === "wishlist" && (
                  <TableCell>
                    <Button onClick={() => updateList(item)}>
                      Add to Cart
                    </Button>
                    <Button onClick={() => updateList(item)}>Remove</Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {type === "cart" && (
        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <Typography variant="h6">
            Total: ${Math.round(calculateTotal())}
          </Typography>
        </div>
      )}
    </Container>
  );
};

export default CartAndWishlist;

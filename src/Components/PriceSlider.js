import React from "react";
import Slider from "@mui/material/Slider";
import { useSelector, useDispatch } from "react-redux";
import { setPriceRange } from "../Redux/Slicer/GlobalSlice";

const PriceSlider = () => {
  const priceRange = useSelector((state) => state.price.priceRange);
  const dispatch = useDispatch();


  /**
 * Handles the change in the price range by dispatching the setPriceRange action.
 *
 * @param {Event} event - The event object triggered by the price change.
 * @param {Array<number>} newValue - The new values for the price range.
 * @returns {void}
 * @function
 * @name handlePriceChange
 * @memberOf YourComponent
 */
  const handlePriceChange = (event, newValue) => {
    dispatch(setPriceRange(newValue));
  };

  return (
    <div style={{ width: "10rem", padding: "15px" }}>
      <Slider
        value={priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        max={300}
      />
      Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
    </div>
  );
};

export default PriceSlider;

import React from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../Redux/Slicer/GlobalSlice";

const SearchComponent = () => {
  const dispatch = useDispatch();


  /**
 * Handles the change in the search input and dispatches an action to update the search query in the Redux store.
 *
 * @param {React.ChangeEvent<HTMLInputElement>} e - The change event of the search input.
 * @returns {void}
 * @function
 * @name handleSearchInputChange
 * @memberof YourComponent
 */
  const handleSearchInputChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div>
      <input type="text" onChange={handleSearchInputChange} />
    </div>
  );
};

export default SearchComponent;

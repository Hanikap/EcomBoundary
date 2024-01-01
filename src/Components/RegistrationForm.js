import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import MyErrorBoundary from "../Components/MyErrorBoundary";
import ErrorFallback from '../Components/ErrorFallback';

function RegistrationForm() {
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJoYW5pa2FwLmJyYWluZXJodWJAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoibE1XcDVpVEtmZ1FlbzR4VUJueEZYVG1BNWdHRDl0MFMtTWxXd1poVDVlUF9ub2FIYW9VeHRQWEE3SHlSaHlwNXFQUSJ9LCJleHAiOjE3MDMyMzg1MzV9.YSp8njOYDzRnuzf2WkIi2MH_StmQ2gCSxf7S8nh6ILs",
    },
  };

  const initialFormData = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    state: "",
    city: "",
  };

  const [formData, setFormData] = useState({ ...initialFormData });

  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const getCountry = async () => {
      try {
        const response = await axios.get(
          "https://www.universal-tutorial.com/api/countries",
          config
        );
        setCountry(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    getCountry();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const getStates = async () => {
      try {
        const response = await axios.get(
          `https://www.universal-tutorial.com/api/states/${formData.country}`,
          config
        );
        setState(response.data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    getStates();
    // eslint-disable-next-line
  }, [formData.country]);

  useEffect(() => {
    const getCity = async () => {
      try {
        const response = await axios.get(
          `https://www.universal-tutorial.com/api/cities/${formData.state}`,
          config
        );
        setCity(response.data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    getCity();
    // eslint-disable-next-line
  }, [formData.state]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z-_]+$/;

    return usernameRegex.test(username);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    return passwordRegex.test(password);
  };

  const addUserToLocalStorage = () => {
    if (formData.email && formData.password) {
      const newUser = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };
      const existingUsers =
        JSON.parse(localStorage.getItem("registeredUsers")) || [];
      const emailExists = existingUsers.some(
        (user) => user.email === newUser.email
      );
      if (emailExists) {
        setErrors({ ...errors, email: "Email Already Exist" });
      } else {
        existingUsers.push(newUser);
        localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));
      }
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = {};

    if (!formData.username) {
      validationErrors.username = "Username is required";
    } else if (!validateUsername(formData.username)) {
      validationErrors.username = "Invalid username";
    }

    if (!formData.email) {
      validationErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      validationErrors.email = "Invalid email address";
    }

    if (!formData.password) {
      validationErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      validationErrors.password = "Invalid password.";
    }

    if (!formData.confirmPassword) {
      validationErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    if (formData.country === "") {
      validationErrors.country = "Please select a country";
    }

    if (formData.state === "") {
      validationErrors.state = "Please select a state";
    }

    if (formData.city === "") {
      validationErrors.city = "Please select a city";
    }

    if (Object.keys(validationErrors).length === 0) {
      addUserToLocalStorage();
      setFormData({ ...initialFormData });

      // Redirect to the login page after successful registration
      navigate("/login");
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <Container maxWidth="sm">
      <MyErrorBoundary>
      <h1>Registration</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.username}
          helperText={errors.username}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email}
        />
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handlePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText error={!!errors.password}>
            {errors.password}
          </FormHelperText>
        </FormControl>
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="country-label">Country</InputLabel>
          <Select
            labelId="country-label"
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            error={!!errors.country}
          >
            <MenuItem value={""}>Select Country</MenuItem>
            {country.map((country, index) => (
              <MenuItem key={index} value={country.country_name}>
                {country.country_name}
              </MenuItem>
            ))}
          </Select>
          {errors.country && (
            <FormHelperText error={true}>{errors.country}</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="state-label">State</InputLabel>
          <Select
            labelId="state-label"
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            error={!!errors.state}
          >
            <MenuItem value={""}>Select State</MenuItem>
            {state.map((state, index) => (
              <MenuItem key={index} value={state.state_name}>
                {state.state_name}
              </MenuItem>
            ))}
          </Select>
          {errors.state && (
            <FormHelperText error={true}>{errors.state}</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="city-label">City</InputLabel>
          <Select
            labelId="city-label"
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            error={!!errors.city}
          >
            <MenuItem value={""}>Select City</MenuItem>
            {city.map((city, index) => (
              <MenuItem key={index} value={city.city_name}>
                {city.city_name}
              </MenuItem>
            ))}
          </Select>
          {errors.city && (
            <FormHelperText error={true}>{errors.city}</FormHelperText>
          )}
        </FormControl>
        <Button
          onClick={handleSubmit}
          type="submit"
          variant="contained"
          color="primary"
        >
          Register
        </Button>
      </form>
      </MyErrorBoundary>
    </Container>
  );
}

export default RegistrationForm;

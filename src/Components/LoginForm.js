import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const initialFormData = {
    email: '',
    password: '',
  };
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ ...initialFormData });
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    const storedUsers = localStorage.getItem('registeredUsers');
    if (storedUsers) {
      setRegisteredUsers(JSON.parse(storedUsers));
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = {};

    if (registeredUsers.length === 0) {
      validationErrors.email = 'No registered users. Please register first.';
      setErrors(validationErrors);
      return;
    }

    if (!formData.email) {
      validationErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      validationErrors.email = 'Invalid email address';
    }

    if (!formData.password) {
      validationErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      validationErrors.password = 'Invalid password.';
    }

    if (Object.keys(validationErrors).length === 0) {
      const user = registeredUsers.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        setFormData({ ...initialFormData });
        navigate('/')
      } else {
        validationErrors.email = 'Invalid email or password';
        setErrors(validationErrors);
      }
    } else {
      setErrors(validationErrors);
    }
  };

 



  
  return (
    <div>

        <form onSubmit={handleSubmit}>
          <h1>Login Here</h1>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
          />
          <br />
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
            />
            <FormHelperText error={!!errors.password}>{errors.password}</FormHelperText>
          </FormControl>
          <br />
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
          {!isLoggedIn && (
            <p>
              Don't have an account? <Link to="/registrationForm">Register here</Link>
            </p>
          )}
        </form>
     
    </div>
  );
};

export default LoginForm;

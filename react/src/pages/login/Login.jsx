import React, { useContext, useRef, useState } from 'react';
import './login.css';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const result = await loginCall({ email: email.current.value, password: password.current.value }, dispatch);
      toast.success('Login successful! Redirecting...');
      setTimeout(() => {
        navigate('/', { state: { successMessage: 'Login successful!' } }); // Pass success message
      }, 2000);
    } catch (err) {
      setErrorMessage('Login failed! Please check your credentials and try again.');
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="login d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="loginWrapper row shadow-lg rounded">
        
        <div className="loginRight col-md-6 d-flex flex-column justify-content-center p-4">
          {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Email" type="email" required className="form-control mb-3" ref={email} />
            <input placeholder="Password" type="password" required minLength="6" className="form-control mb-3" ref={password} />
            <button className="btn btn-primary w-100 mb-3" type="submit" disabled={isFetching}>
              {isFetching ? <CircularProgress color="inherit" size={24} /> : "Log In"}
            </button>
            <span className="loginForgot text-primary text-center mb-3">Forgot Password?</span>
            <button className="btn btn-success w-100" type="button" onClick={handleRegisterClick} disabled={isFetching}>
              {isFetching ? <CircularProgress color="inherit" size={24} /> : "Create a New Account"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}


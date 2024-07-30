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
        navigate('/', { state: { successMessage: 'Login successful!' } });
      }, 2000);
    } catch (err) {
      setErrorMessage('Login failed! Please check your credentials and try again.');
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <>
      <div className="loginImg d-flex align-items-center justify-content-center vh-100 bg-light"
           style={{ backgroundImage: `url('/assets/solar.jpeg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="login">
          <div className="loginWrapper shadow-lg rounded">
            <h2 className='loginText'>Login</h2>
            <div className="loginRight">
              {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
              <form className="loginBox" onSubmit={handleClick}>
                <input placeholder="Email" type="email" required className="form-control" ref={email} />
                <input placeholder="Password" type="password" required minLength="6" className="form-control" ref={password} />
                <button className="btn  w-100" type="submit" style= {{background: 'linear-gradient(to right, #3b82f6, #172554)',color: 'white',border: 'none',padding: '10px 20px',transition: 'background-color 0.3s ease'}} disabled={isFetching}>
                  {isFetching ? <CircularProgress color="inherit" size={24} /> : "Log In"}
                </button>
                <span className="loginForgot">Forgot Password?</span>
                <button className="btn  w-100" type="button" style={{background: 'linear-gradient(to right, #ca8a04, #422006)',color: 'white',border: 'none',padding: '10px 20px',transition: 'background-color 0.3s ease'}} onClick={handleRegisterClick} disabled={isFetching}>
                  {isFetching ? <CircularProgress color="inherit" size={24} /> : "Create a New Account"}
                </button>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

import React, { useRef } from 'react';
import './register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      passwordAgain.current.setCustomValidity('');
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post('/auth/register', user);
        navigate('/login');
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <>
    <div >
      <div className="registerbg d-flex align-items-center justify-content-center bg-black vh-100 vw-100"
      >
      <div className='register '>
      <div className="registerWrapper row shadow-lg rounded">
        <div className="registerLeft col-md-6 d-flex flex-column justify-content-center align-items-center bg-primary text-white p-4 rounded-left" style={{ backgroundImage: `url('/assets/solar.jpeg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <h1 className="registerLogo">SkyLink</h1>
          <span className="registerDesc">Get Started Today!</span>
          <span className="registerSubDesc">Join SkyLink today and connect with a vibrant community. Share moments, explore interests, and build meaningful connections where every interaction truly matters.</span>
        </div>
        <div className="registerRight col-md-6 d-flex flex-column justify-content-center p-4">
          <form className="registerBox" onSubmit={handleClick}>
            <input placeholder="Username" required ref={username} className="form-control mb-3" />
            <input placeholder="Email" required ref={email} className="form-control mb-3" type="email" />
            <input placeholder="Password" required ref={password} className="form-control mb-3" type="password" minLength="6" />
            <input placeholder="Confirm Password" required ref={passwordAgain} className="form-control mb-3" type="password" />
            <button className="btn  w-100 mb-3" type="submit" style= {{background: 'linear-gradient(to right, #3b82f6, #172554)',color: 'white',border: 'none',padding: '10px 20px',transition: 'background-color 0.3s ease'}}>Sign Up</button>
            <button className="btn  w-100" type="button" onClick={handleLoginClick} style={{background: 'linear-gradient(to right, #ca8a04, #422006)',color: 'white',border: 'none',padding: '10px 20px',transition: 'background-color 0.3s ease'}}>Log into your Account</button>
          </form>
        </div>
      </div>
    </div>
      </div>
       
      
      </div>
      
  
    </>
  );
}

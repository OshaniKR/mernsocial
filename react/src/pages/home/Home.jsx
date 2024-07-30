import React, { useEffect } from 'react';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import Center from '../../components/center/Center';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const successMessage = location.state?.successMessage || '';

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      // Clear the state after showing the success message
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [successMessage, location, navigate]);

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <div className="centerContainer">
          <Center />
        </div>
        <Rightbar />
      </div>
      <ToastContainer />
    </>
  );
}

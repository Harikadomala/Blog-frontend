import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear session storage
    sessionStorage.clear();

    // Optional: show a logout confirmation toast/snackbar here

    // Redirect to login page
    navigate('/login');
  }, [navigate]);

  return null; // Nothing to render visually
};

export default Logout;

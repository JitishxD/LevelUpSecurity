import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { logoutUser } from '../services/auth';

const Home = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser(); // Call API to destroy session on backend
    logout(); // Update the context state
    navigate('/auth/login'); // Redirect to login page
  };

  return (
    <nav>
      {isAuthenticated && (
        <button onClick={handleLogout} className="logout-button font-medium bg-amber-400 text-sky-500 hover:text-sky-400 ml-2 focus:outline-none">
          Sign Out
        </button>
      )}
    </nav>
  );
};

export default Home;
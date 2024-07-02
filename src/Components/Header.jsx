import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdArrowDropDown } from 'react-icons/md';
import { CiLogin } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/Slice/userSlice';
import { getAuth, signOut } from 'firebase/auth';

const Header = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleToggle = (e) => {
    const newTheme = e.target.checked ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-light ${theme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src="path/to/logo.png" alt="FourPaws Logo" className="w-8 h-8 rounded-full mr-2" />
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">FourPaws</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/pet" className="nav-link">Pet</Link>
            </li>
            <li className="nav-item">
              <Link to="/create-donation" className="nav-link">Donation Campaigns</Link>
            </li>
          </ul>
        </div>
        <div className="d-flex align-items-center">
          {children}
          {user ? (
            <div className="dropdown">
              <button className="btn btn-outline-dark dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full" />
                <MdArrowDropDown />
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li><Link to="/userdashboard" className="dropdown-item">Dashboard</Link></li>
                <li><button onClick={handleSignOut} className="dropdown-item">Log Out <CiLogin /></button></li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn btn-outline-dark">
              <CiLogin />
              <span>Login</span>
            </Link>
          )}
          <div className="form-check form-switch ms-3">
            <input
              type="checkbox"
              id="theme-switch"
              className="form-check-input"
              onChange={handleToggle}
              checked={theme === 'dark'}
            />
            <label className="form-check-label" htmlFor="theme-switch">Dark Mode</label>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

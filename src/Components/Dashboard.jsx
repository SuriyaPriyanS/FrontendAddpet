import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { MdArrowDropDown } from 'react-icons/md';
import axios from 'axios';
import './Dashboard.css';
import Navbar from '../Components/Header'; // Ensure correct path to Navbar
import { selectCurrentUser, logout } from '../redux/Slice/userSlice';

const Dashboard = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Fetch user data and check admin status
        axios.get('http://localhost:5000/api/user/profile', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        })
        .then(response => {
            setIsAdmin(response.data.role === 'Admin');
        })
        .catch(error => {
            console.error('Error fetching user profile:', error);
        });
    }, []);

    const handleLogout = () => {
        dispatch(logout());
    };

    const navLinks = (
        <>
            {/* Admin links */}
            {isAdmin && (
                <>
                    <li className="mb-2">
                        <NavLink
                            to="/allusers"
                            className="text-yellow-500 text-lg font-bold underline hover:text-red-600"
                        >
                            All Users
                        </NavLink>
                    </li>
                    <li className="mb-2">
                        <NavLink
                            to="/allpetsadmin"
                            className="text-yellow-500 text-lg font-bold underline hover:text-red-600"
                        >
                            All Pets
                        </NavLink>
                    </li>
                    <li className="mb-2">
                        <NavLink
                            to="/alldonationcampadmin"
                            className="text-yellow-500 text-lg font-bold underline hover:text-red-600"
                        >
                            All Donation Campaigns
                        </NavLink>
                    </li>
                    <div className="border-t border-gray-300 my-4"></div>
                </>
            )}
            {/* User links */}
            <li className="mb-2">
                <NavLink
                    to="/MyaddedPets"
                    className="text-yellow-500 text-lg font-bold underline hover:text-red-600"
                >
                    My Added Pets
                </NavLink>
                <br/>
                <NavLink
                    to="/AdaptationPage"
                    className="text-yellow-500 text-lg font-bold underline hover:text-red-600"
                >
                    Add a Pet
                </NavLink>
                <br/>
                <NavLink
                    to="/pet"
                    className="text-yellow-500 text-lg font-bold underline hover:text-red-600"
                >
                    Pet
                </NavLink>
                <br/>
            </li>
            <div className="border-t border-gray-300 my-4"></div>
            {/* Home link */}
            <li className="pt-4">
                <NavLink
                    to="/"
                    className="text-yellow-500 text-lg font-bold underline hover:text-red-600"
                >
                    Home
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="col-lg-9 bg-light min-vh-100">
            <div className="dropdown position-absolute mt-10">
                <button className="btn btn-outline-secondary dropdown-toggle d-lg-none" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <MdArrowDropDown />
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <ul>{navLinks}</ul>
                </div>
            </div>
            <div className="dashboard-header">
                <p>User Dashboard</p>
            </div>
            <p className="dashboard-welcome">
                Welcome {currentUser ? currentUser.displayName : 'to Your Dashboard'}
            </p>
            {currentUser && (
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            )}
        </div>
    );
};

export default Dashboard;

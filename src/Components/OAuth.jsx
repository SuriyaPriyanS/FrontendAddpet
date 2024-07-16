import React from 'react';
import { Button } from 'react-bootstrap';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { loginFailure, loginSuccess } from '../redux/Slice/userSlice';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import axios from 'axios'; // Ensure axios is imported
import { app } from '../firebase'; // Ensure app is correctly imported

const OAuth = () => {
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });

        try {
            const result = await signInWithPopup(auth, provider);
            //const API_BASE_URL = 'https://suriyaadption.onrender.com/';
            const response = await axios.post('https://suriyaadption.onrender.com/api/google', {
                name: result.user.displayName,
                email: result.user.email,
                profilePict: result.user.photoURL,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = response.data;
            if (response.status === 200) {
                dispatch(loginSuccess(data));
                navigate('/');
            }
        } catch (error) {
            dispatch(loginFailure(error.message));
        }
    };

    return (
        <Button className='my-2 m-5' type='button' variant="primary" onClick={handleSubmit}>
            <AiFillGoogleCircle className='w-8 h-8 mr-5' />
            Continue with Google
        </Button>
    );
};

export default OAuth;

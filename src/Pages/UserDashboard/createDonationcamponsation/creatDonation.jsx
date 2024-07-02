import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { loginStart, loginSuccess, loginFailure } from '../../../redux/Slice/userSlice'; // Update path based on your file structure

const CreateDonationCampaign = () => {
    const { user } = useContext(AuthContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

    const initialValues = {
        name: "",
        max_donation_limit: "",
        date: "",
        shortdesp: "",
        longdesp: "",
        photo: "",
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        onSubmit: async () => {
            try {
                await saveImage(); // Assuming this is where your saveImage function resides
                if (!url) {
                    return toast.error("Image not uploaded successfully. Please try again.");
                }

                const currentDate = new Date();
                const formattedDate = currentDate.toLocaleDateString("en-US");
                const formattedTime = currentDate.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: true,
                });

                const newdonationcamp = {
                    image: url || 'photo',
                    name: values.name,
                    max_donation_limit: values.max_donation_limit,
                    last_donation_date: values.date,
                    shortdesp: values.shortdesp,
                    longdesp: values.longdesp,
                    addedDate: `${formattedDate} ${formattedTime}`,
                    userEmail: user.email,
                    pause: false
                };

                const response = await axios.post("http://localhost:5000/api/adddonationcamp", newdonationcamp, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = response.data;

                if (data.insertedId) {
                    Swal.fire({
                        title: "Success!",
                        text: "Donation Campaign Added Successfully",
                        icon: "success",
                        confirmButtonText: "Ok",
                    });
                    navigate('/');
                }
            } catch (error) {
                console.error("Error adding camp:", error);
            }
        },
    });

    return (
        <div>
            <div className="flex items-center justify-center p-12 w-full lg:w-10/12 mx-auto bg-base-7f00 mt-16 rounded-xl">
                <div className="mx-auto w-full max-w-[550px] shadow-lg p-6 rounded-md">
                    <form onSubmit={handleSubmit}>
                        {/* Form fields */}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateDonationCampaign;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../store/userSlice';
import { Link, useNavigate } from 'react-router-dom';  

const EditProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const { userId, accessToken, userData } = useSelector((state) => state.user);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: userData.email || '',
        firstname: userData.firstname || '',
        lastname: userData.lastname || '',
        address: userData.address || '',
        phonenumber: userData.phonenumber || '',
        resume: userData.resume || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "phonenumber") {
            setFormData({ ...formData, [name]: value });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/update/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                dispatch(updateUser(formData));
                setError('Profile updated successfully!');
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000);


            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    useEffect(() => {
        if (userData) {
            setFormData({
                email: userData.email || '',
                firstname: userData.firstname || '',
                lastname: userData.lastname || '',
                address: userData.address || '',
                phonenumber: userData.phonenumber || '',
                resume: userData.resume || '',
            });
        }
    }, [userData]);

    return (
        <div className="h-screen flex overflow-hidden font-sora bg-white">
            <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                    <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900 text-center">Edit Profile</h1>
                    <p className="text-sm text-gray-500 text-center my-4">Update your account details</p>
                    {error && <p className="text-red-500 text-center text-sm">{error}</p>}
                    <form onSubmit={handleSubmit} className="w-full mt-8">
                        <div className="flex flex-col gap-4">
                            <input
                                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-300 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                required
                            />
                            <input
                                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                placeholder="First Name"
                                required
                            />
                            <input
                                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                placeholder="Last Name"
                                required
                            />
                            <input
                                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Address"
                                required
                            />
                            <input
                                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                name="phonenumber"
                                value={formData.phonenumber}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                required
                            />
                            <input
                                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                name="resume"
                                value={formData.resume}
                                onChange={handleChange}
                                placeholder="Resume Link (optional)"
                            />
                            <button
                                type="submit"
                                className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-[#407BFF]"
                            >
                                <span className="ml-3">Update Profile</span>
                            </button>
                            <Link to='/password-reset'>
                            <button
                                type="submit"
                                className="mt-5 tracking-wide font-semibold bg-red-900 text-gray-100 w-full py-4 rounded-lg hover:bg-red-400"
                            >
                                <span className="ml-3">Reset Password</span>
                            </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;

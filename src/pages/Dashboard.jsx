import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';

const Dashboard = () => {
    const { userData } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const handleEditProfile = () => {
        navigate('/edit-profile');
    };

    return (
        <div className="h-screen flex items-center justify-center font-sora">

            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome, {userData.firstname}!</h1>
                <button
                    onClick={handleEditProfile}
                    className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-[#407BFF] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                    Edit Profile
                </button>
                <Navbar />
            </div>
        </div>
    );
};

export default Dashboard;

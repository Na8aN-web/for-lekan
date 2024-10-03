import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex justify-center items-center min-h-screen font-sora">
      <div>
        <h1 className="text-3xl mb-4 text-center">Home</h1>
        <div className='flex justify-center gap-8'>
          <Link to="/signup" className="text-blue-500 underline text-[20px]">
            Sign Up
          </Link>
          <Link to="/signin" className="text-blue-500 underline text-[20px]">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

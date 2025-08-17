import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('user');

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      navigate(`/#${id}`);
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSignUp = () => {
    navigate('/register'); // redirect to Register page
  };

  const handleStartEstimating = () => {
    if (isLoggedIn) {
      navigate('/StEstimating'); // user logged in
    } else {
      navigate('/login'); // not logged in → redirect to login/register
    }
  };

  return (
    <nav className="flex flex-col md:flex-row justify-between items-center px-4 py-3 bg-white shadow-md">
      <div className="text-xl font-bold text-indigo-600 mb-3 md:mb-0 md:ml-[5%]">
        ScopeMate
      </div>

      <ul className="flex flex-col md:flex-row gap-4 md:gap-5 items-center text-gray-700 font-medium md:mr-[10%]">
        <li>
          <button onClick={() => scrollToSection('landing')} className="hover:text-indigo-500">
            Home
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection('hworks')} className="hover:text-indigo-500">
            How it works
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection('features')} className="hover:text-indigo-500">
            Features
          </button>
        </li>
        <li>
          <button
            onClick={handleStartEstimating}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg shadow-md"
          >
            Start Estimating
          </button>
        </li>
        <li className="md:hidden">
          <button
            onClick={handleSignUp}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Sign up
          </button>
        </li>
      </ul>

      <div className="hidden md:block md:mr-[5%]">
        <button
          onClick={handleSignUp}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Sign up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

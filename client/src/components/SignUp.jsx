import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import InputField from '../components/InputField';

function SignUp({ setUser }) {
  const [user, setUserData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData(prev => ({ ...prev, [id]: value }));
  };

  const validate = () => {
    const newErrors = { name: '', email: '', password: '', confirmPassword: '' };
    if (!user.name.trim()) newErrors.name = 'Name is required';
    if (!user.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(user.email)) newErrors.email = 'Email is invalid';
    if (!user.password) newErrors.password = 'Password is required';
    else if (user.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (user.password !== user.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}signup`, user, { withCredentials: true });
        if (response.data.auth) {
          setUser(response.data.user);
          toast.success('Sign up successful!');
          navigate('/profile');
        } else {
          toast.error(response.data.message || 'Sign up failed');
        }
      } catch (error) {
        console.error('Sign up error:', error);
        toast.error('An error occurred during sign up');
      }
    } else {
      Object.values(errors).forEach(error => {
        if (error) toast.error(error);
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign Up</h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit}>
            <InputField
              label="Name"
              id="name"
              type="text"
              placeholder="Enter your name"
              value={user.name}
              onChange={handleChange}
              error={errors.name}
            />
            <InputField
              label="Email"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={handleChange}
              error={errors.email}
            />
            <InputField
              label="Password"
              id="password"
              type="password"
              placeholder="Create a password"
              value={user.password}
              onChange={handleChange}
              error={errors.password}
            />
            <InputField
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={user.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />
            <div className="mt-6">
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign Up
              </button>
            </div>
          </form>
          <div className="mt-6">
            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
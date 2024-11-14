import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginUserMutation } from '../redux/features/auth/authApi';
import { setUser } from '../redux/features/auth/authSlice'; // Make sure you have this import

const Login = () => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate(); // To redirect the user after successful login

  const [loginUser, { isLoading: loginLoading, isError, error }] = useLoginUserMutation();

  // Handle login logic
  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset any previous messages or errors
    setMessage('');

    // Validate email and password
    if (!email || !password) {
      setMessage('Email and Password are required');
      return;
    }

    const data = { email, password };

    try {
      const response = await loginUser(data).unwrap();
      if (response) {
        // Dispatch setUser action to store the user and token
        const { token, user } = response;
        dispatch(setUser({ user, token })); // Corrected dispatch

        // Log the user and token to the console
        console.log('User:', user);
        console.log('Token:', token);

        // Redirect to homepage or dashboard after successful login
        navigate('/');
      }
    } catch (err) {
      setMessage(error?.data?.message || 'Login failed. Please check your email and password.');
    }
  };

  return (
    <section className="h-screen flex items-center justify-center bg-gray-100">
      {/* Container for left image and right form */}
      <div className="flex w-full max-w-screen-xl mx-auto rounded-lg overflow-hidden">
        {/* Left Image Section */}
        <div
          className="hidden md:block w-1/2 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1439853949127-fa647821eba0')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh', // Makes the image stretch to fill the height of the screen
          }}
        ></div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 bg-white shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Login</h2>

          {/* Login Form */}
          <form className="w-full max-w-md" onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state
                className="w-full p-3 mt-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state
                className="w-full p-3 mt-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
              />
            </div>

            {/* Displaying message if there's any */}
            {message && <p className="text-red-500 mb-4">{message}</p>}

            <button
              type="submit"
              disabled={loginLoading} // Disable the button while the login request is in progress
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            >
              {loginLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Forgot Password Link */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-500 hover:underline ml-2">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

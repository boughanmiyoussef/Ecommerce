import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import { useRegisterUserMutation } from '../redux/features/auth/authApi'; // Assuming you have the register API mutation

const Register = () => {
  const [message, setMessage] = useState(""); // For handling error or success messages
  const [username, setUsername] = useState(""); // For handling username input
  const [email, setEmail] = useState(""); // For handling email input
  const [password, setPassword] = useState(""); // For handling password input

  // Get the mutation function and the loading state from the useRegisterUserMutation hook
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate(); // To navigate after successful registration

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!username || !email || !password) {
      setMessage("All fields are required.");
      return;
    }

    const data = { username, email, password };

    try {
      // Attempt to register the user
      const response = await registerUser(data).unwrap(); // unwrap() is used to access the actual response
      
      // If registration is successful
      if (response) {
        setMessage("Registration successful! You can now log in.");
        navigate("/login");
      }
    } catch (err) {
      // Handle errors in registration
      if (err?.data?.message) {
        setMessage(err.data.message); // Display server error message if available
      } else {
        setMessage("Registration failed. Please try again."); // Generic error message if no specific error
      }
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
            backgroundImage:
              "url('https://images.unsplash.com/photo-1439853949127-fa647821eba0')",
            backgroundSize: "cover", // Ensures the image covers the area completely
            backgroundPosition: "center", // Centers the image
            height: "100vh", // Makes the image stretch to fill the height of the screen
          }}
        ></div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 bg-white shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Create an Account</h2>

          {/* Register Form */}
          <form className="w-full max-w-md" onSubmit={handleRegister}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-600">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Update username state
                className="w-full p-3 mt-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your username"
              />
            </div>

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
              disabled={isLoading} // Disable button when loading
              className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
            >
              {isLoading ? "Registering..." : "Register Now"} {/* Show loading text while registering */}
            </button>
          </form>

          {/* Already have an account? Link */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline ml-2">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;

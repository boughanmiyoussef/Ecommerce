const express = require('express');
const User = require('./user.model');
const generateToken = require('../middleware/generateToken');
const verifyToken = require('../middleware/verifyToken');  // Import verifyToken middleware
const router = express.Router();

// Register Endpoint
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if all fields are provided
        if (!username || !email || !password) {
            return res.status(400).send({ message: "Username, email, and password are required" });
        }

        // Create a new user instance
        const user = new User({ username, email, password });
        await user.save();

        // Generate JWT token
        const token = await generateToken(user.id);

        // Log the token for debugging
        console.log("🔥 JWT Token:", token, "🔥");

        // Send the token in a cookie (secure for production)
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true only in production (HTTPS)
            sameSite: 'None',  // 'None' needed for cross-site cookies (in some cases)
        });

        // Return response with user info
        res.status(201).send({
            message: "User Registration Successful",
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
                profileImage: user.profileImage,
                bio: user.bio,
                profession: user.profession,
            },
        });
    } catch (error) {
        console.error("Error registering user:", error);  // More detailed error logging
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
});

// Login Endpoint
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email or password is missing
        if (!email || !password) {
            return res.status(400).send({ message: "Email and password are required" });
        }

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({ message: "User Not Found" });
        }

        // Log candidate password and stored (hashed) password for debugging
        console.log("Candidate Password:", password);
        console.log("Stored Password (hashed):", user.password);

        // Compare password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).send({ message: "Password Not Match" });
        }

        // Generate JWT token for the logged-in user
        const token = await generateToken(user.id);

        // Log the token for debugging
        console.log("🔥 JWT Token:", token, "🔥");

        // Send the token as a secure cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only set secure in production
            sameSite: 'None',  // Necessary for cross-site cookies (CORS)
        });

        // Send user info and success message
        res.status(200).send({
            message: "Login Successful",
            token: token, // Correctly include the token as a key-value pair
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
                profileImage: user.profileImage,
                bio: user.bio,
                profession: user.profession,
            },
        });
    } catch (error) {
        console.error("Login Error:", error);  // Log the actual error for better debugging
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
});

// Logout Endpoint
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).send({ message: 'Logged Out Successfully' });
});

// Delete A User
router.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;  // Correct way to destructure the id from req.params
        const user = await User.findByIdAndDelete(id);  // Correct function name

        if (!user) {
            return res.status(404).send({ message: "User Not Found" });
        }

        res.status(200).send({ message: 'User Deleted Successfully' });
    } catch (error) {
        console.error("Error Deleting User:", error);  // Log the actual error for better debugging
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
});

// Get All Users (Protected Route)
router.get('/users', verifyToken, async (req, res) => {
    try {
        const users = await User.find()
            .sort({ createdAt: -1 })  // Sort by createdAt in descending order
            .lean();                  // Convert MongoDB documents to plain JS objects

        res.status(200).send({
            message: "All users retrieved successfully",
            users: users,
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
});


// Update User
router.put('/users/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { username, bio, profileImage, profession, email } = req.body;

        const updateData = {};

        if (username) updateData.username = username;
        if (bio) updateData.bio = bio;
        if (profileImage) updateData.profileImage = profileImage;
        if (profession) updateData.profession = profession;
        if (email) updateData.email = email;

        const user = await User.findByIdAndUpdate(id, updateData, { new: true });

        if (!user) {
            return res.status(404).send({ message: "User Not Found" });
        }
        res.status(200).send({
            message: "User Updated Successfully",
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
                profileImage: user.profileImage,
                bio: user.bio,
                profession: user.profession,
            },
        });
    } catch (error) {
        console.error("Error Updating User:", error);
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
});

// Update or Edit Profile Hna username ma7abech yetbadel lo5rin kol
router.patch('/edit-profile', async (req, res) => {
    try {
        const { userId, username, profileImage, bio, profession, email } = req.body;

        // Check if userId is provided
        if (!userId) {
            return res.status(400).send({ message: "User Id is required" });
        }

        // Find the user by userId
        const user = await User.findById(userId);

        // If user is not found, return a 404 error
        if (!user) {
            return res.status(404).send({ message: "User Not Found" });
        }

        // Check if the new email is unique before updating
        if (email !== undefined && email !== user.email) {
            const existingEmailUser = await User.findOne({ email: email });
            if (existingEmailUser) {
                return res.status(400).send({ message: "Email already taken." });
            }
            user.email = email;  // Update email if it's unique
        }

        // Check if the new username is unique before updating
        if (username !== undefined && username !== user.username) {
            const existingUsernameUser = await User.findOne({ username: username });
            if (existingUsernameUser) {
                return res.status(400).send({ message: "Username already taken." });
            }
            user.username = username;  // Update username if it's unique
        }

        // Update other fields if they are provided
        if (profileImage !== undefined) {
            user.profileImage = profileImage;
        }

        if (bio !== undefined) {
            user.bio = bio;
        }

        if (profession !== undefined) {
            user.profession = profession;
        }

        // Save the updated user
        await user.save();

        // Return the updated user data in the response
        res.status(200).send({
            message: 'Profile Updated Successfully',
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
                profileImage: user.profileImage,
                bio: user.bio,
                profession: user.profession,
            },
        });

    } catch (error) {
        console.error("Error Updating Profile:", error);
        res.status(500).send({ message: "Error Updating Profile", error: error.message });
    }
});











module.exports = router;



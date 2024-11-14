const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    default: 'user',
  },
  profileImage: String,
  bio: { type: String, maxlength: 200 },
  profession: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

// Hashing Password
userSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) return next(); // Only hash if password was modified
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword; // Store the hashed password
  next();
});

// Matching Password
userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password); // Compare candidate password with hashed password
};

// Model creation
const User = model('User', userSchema);

module.exports = User;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

exports.register = async (req, res) => {
  try {
    const {
      fullName,
      mobile,
      village,
      role,
      password,
      email,
      latitude,
      longitude,
    } = req.body;

    const existingUser = await User.findOne({
      mobile,
    });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User already exists with this mobile number",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      mobile,
      village,
      role,
      email,
      latitude,
      longitude,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      token: generateToken(user._id),
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const {
      mobile,
      password,
      latitude,
      longitude,
    } = req.body;

    const user = await User.findOne({
      mobile,
    });

    if (!user) {
      return res.status(401).json({
        message:
          "Invalid mobile number or password",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(401).json({
        message:
          "Invalid mobile number or password",
      });
    }

    await User.findByIdAndUpdate(
      user._id,
      {
        latitude:
          latitude || user.latitude,
        longitude:
          longitude || user.longitude,
      }
    );

    const updatedUser =
      await User.findById(user._id);

    res.json({
      success: true,
      message: "Login successful",
      token: generateToken(
        updatedUser._id
      ),
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAllUsers = async (
  req,
  res
) => {
  try {
    const users = await User.find().select(
      "-password"
    );

    res.json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteUser = async (
  req,
  res
) => {
  try {
    await User.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message:
        "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProfile = async (
  req,
  res
) => {
  try {
    const user = await User.findById(
      req.params.id
    ).select("-password");

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProfile = async (
  req,
  res
) => {
  try {
    const updateData = {
      fullName: req.body.fullName,
      mobile: req.body.mobile,
      village: req.body.village,
      email: req.body.email,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    };

    if (req.file) {
      updateData.profilePhoto =
        `/uploads/users/${req.file.filename}`;
    }

    const user =
      await User.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      ).select("-password");

    res.json({
      success: true,
      message:
        "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  register,
  login,
  getAllUsers,
  deleteUser,
  getProfile,
  updateProfile,
} = require("../controllers/authController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/users");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

router.post("/register", register);
router.post("/login", login);

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

router.get("/profile/:id", getProfile);

router.put(
  "/profile/:id",
  upload.single("profilePhoto"),
  updateProfile
);

module.exports = router;
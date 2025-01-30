const express = require("express");
const { loginUser, createAdmin, getProfile, resetPassword, logout } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const isSuperAdmin = require("../middleware/isSuperAdmin");

const router = express.Router();

router.post("/login", loginUser);
router.post("/create-admin", authMiddleware, isSuperAdmin, createAdmin); 
router.get("/profile", authMiddleware, getProfile); 
router.post("/reset-password", authMiddleware, resetPassword);
router.post("/logout", logout);


module.exports = router;
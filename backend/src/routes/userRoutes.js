const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const { validateRegister } = require("../middlewares/validationMiddleware");

const router = express.Router();

// Rotas públicas
router.post("/register", validateRegister, registerUser);
router.post("/login", loginUser);

// Rotas protegidas
router.get("/profile", protect, getUserProfile);

module.exports = router;
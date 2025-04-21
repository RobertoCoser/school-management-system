const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const { check, validationResult } = require("express-validator");
const router = express.Router();

// Rotas públicas
router.post("/register", registerUser);
router.post("/login", loginUser);

// Rotas protegidas
router.get("/profile", protect, getUserProfile);

module.exports = router;

// Validação de dados para o registro de usuário
router.post(
    "/register",
    [
        check("name", "O nome é obrigatório").notEmpty(),
        check("email", "Por favor, insira um e-mail válido").isEmail(),
        check("password", "A senha deve ter pelo menos 6 caracteres").isLength({ min: 6 }),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    registerUser
);
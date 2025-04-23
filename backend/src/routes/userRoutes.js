const express = require("express");
const {
    registerUser,
    loginUser,
    getUserProfile,
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent,
} = require('../controllers/userController');
const { protect } = require("../middleware/authMiddleware");
const { validateRegister } = require("../middleware/validationMiddleware");

const router = express.Router();

// Rotas públicas
router.post("/register", validateRegister, registerUser);
router.post("/login", loginUser);

// Rotas protegidas
router.get("/profile", protect, getUserProfile);

// Alunos
router.get('/students', getStudents);
router.post('/students', createStudent);
router.put('/students/:id', updateStudent);
router.delete('/students/:id', deleteStudent);

module.exports = router;
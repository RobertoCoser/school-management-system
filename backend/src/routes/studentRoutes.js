const express = require("express");
const {
    createStudent,
    getStudents,
    updateStudent,
    deleteStudent,
} = require("../controllers/studentController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Rotas protegidas
router.post("/", protect, createStudent);
router.get("/", protect, getStudents);
router.put("/:id", protect, updateStudent);
router.delete("/:id", protect, deleteStudent);

module.exports = router;
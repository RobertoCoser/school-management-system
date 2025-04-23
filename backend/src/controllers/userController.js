// Imports
const Student = require('../models/Student');
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const asyncHandler = require('express-async-handler');
const jwt = require("jsonwebtoken");

// Funções
const getStudents = asyncHandler(async (req, res) => {
    const students = await Student.find().populate('class', 'name');
    res.status(200).json({ success: true, count: students.length, data: students });
});

const createStudent = asyncHandler(async (req, res) => {
    const student = await Student.create(req.body);
    res.status(201).json({ success: true, data: student });
});

const updateStudent = asyncHandler(async (req, res) => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!student) {
        return res.status(404).json({ success: false, message: 'Aluno não encontrado' });
    }

    res.status(200).json({ success: true, data: student });
});

const deleteStudent = asyncHandler(async (req, res) => {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
        return res.status(404).json({ success: false, message: 'Aluno não encontrado' });
    }

    res.status(200).json({ success: true, data: {} });
});

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "Usuário já existe!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword, role });

    if (user) {
        res.status(201).json({ _id: user.id, name: user.name, email: user.email, role: user.role });
    } else {
        res.status(400).json({ message: "Dados inválidos!" });
    }
});

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Credenciais inválidas." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    res.status(200).json({ _id: user._id, name: user.name, email: user.email, token });
};

const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    });
};

// Exportação
module.exports = {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    registerUser,
    loginUser,
    getUserProfile
};

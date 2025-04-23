const Student = require('../models/Student');
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const asyncHandler = require('express-async-handler');
const jwt = require("jsonwebtoken");

// Retorna todos os alunos
exports.getStudents = asyncHandler(async (req, res) => {
    const students = await Student.find().populate('class', 'name');
    res.status(200).json({
        success: true,
        count: students.length,
        data: students
    });
});

// Cria um novo aluno
exports.createStudent = asyncHandler(async (req, res) => {
    const student = await Student.create(req.body);
    res.status(201).json({
        success: true,
        data: student
    });
});

// Atualiza um aluno
exports.updateStudent = asyncHandler(async (req, res) => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!student) {
        return res.status(404).json({
            success: false,
            message: 'Aluno não encontrado'
        });
    }

    res.status(200).json({
        success: true,
        data: student
    });
});

// Deleta um aluno
exports.deleteStudent = asyncHandler(async (req, res) => {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: 'Aluno não encontrado'
        });
    }

    res.status(200).json({
        success: true,
        data: {}
    });
});

// Registra um novo usuário
exports.registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Usuário já existe!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            });
        } else {
            res.status(400).json({ message: "Dados inválidos!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor.", error: error.message });
    }
});

// Login de usuário
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verifica se o usuário existe
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Credenciais inválidas. Usuário não encontrado." });
        }

        // Verifica se a senha está correta
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Credenciais inválidas. Senha incorreta." });
        }

        // Gera o token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d", // Token válido por 30 dias
        });

        // Retorna os dados do usuário e o token
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor.", error: error.message });
    }
};

// Retorna o perfil do usuário autenticado
exports.getUserProfile = async (req, res) => {
    try {
        // O middleware `protect` já define o usuário autenticado em `req.user`
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        // Retorna os dados do perfil do usuário
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role, // Role do usuário (se existir no modelo)
        });
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor.", error: error.message });
    }
};

module.exports = { registerUser, loginUser, getUserProfile, getStudents, createStudent, updateStudent, deleteStudent };
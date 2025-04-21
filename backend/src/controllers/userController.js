const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registrar um novo usuário
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "Usuário já existe" });

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
            });
        } else {
            res.status(400).json({ message: "Dados inválidos" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor", error });
    }
};

// Login de usuário
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: "30d",
            });

            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token,
            });
        } else {
            res.status(401).json({ message: "Credenciais inválidas" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor", error });
    }
};

// Perfil do usuário autenticado
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user.id);

    if (user) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(404).json({ message: "Usuário não encontrado" });
    }
};

module.exports = { registerUser, loginUser, getUserProfile };
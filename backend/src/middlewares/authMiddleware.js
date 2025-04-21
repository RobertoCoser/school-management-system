const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Extrair token do cabeçalho
            token = req.headers.authorization.split(" ")[1];

            // Verificar e decodificar o token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Buscar o usuário pelo ID do token
            req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            res.status(401).json({ message: "Não autorizado, token inválido" });
        }
    }

    if (!token) {
        res.status(401).json({ message: "Não autorizado, sem token" });
    }
};

module.exports = { protect };
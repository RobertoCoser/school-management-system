const { check, validationResult } = require("express-validator");

exports.validateRegister = [
    check("name", "O nome é obrigatório").notEmpty(),
    check("email", "Por favor, insira um e-mail válido").isEmail(),
    check("password", "A senha deve ter pelo menos 6 caracteres").isLength({ min: 6 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
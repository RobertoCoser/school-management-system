module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }
    try {
        // Verificar o token (substitua pelo seu método de verificação)
        const decoded = jwt.verify(token, 'seuSegredo');
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};
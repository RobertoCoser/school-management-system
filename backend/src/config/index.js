const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('✅ Conectado ao MongoDB');
    } catch (err) {
        console.error(`❌ Erro ao conectar ao MongoDB: ${err.message}`);
        process.exit(1);
    }
};

exports.generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.ErrorResponse = ErrorResponse;
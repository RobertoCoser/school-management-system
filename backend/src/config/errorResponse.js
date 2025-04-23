class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // Para distinguir erros operacionais
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorResponse;
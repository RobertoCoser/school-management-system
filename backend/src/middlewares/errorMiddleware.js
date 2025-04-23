const { ErrorResponse } = require('../config');

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        error: err.message || 'Erro interno do servidor',
    });
};

const notFound = (req, res, next) => {
    const error = new ErrorResponse(`Rota não encontrada: ${req.originalUrl}`, 404);
    next(error);
};

module.exports = {
    errorHandler,
    notFound,
};
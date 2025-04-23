const ErrorResponse = require('../utils/ErrorResponse');

module.exports = (req, res, next) => {
    next(new ErrorResponse(`Rota ${req.originalUrl} não encontrada`, 404));
};
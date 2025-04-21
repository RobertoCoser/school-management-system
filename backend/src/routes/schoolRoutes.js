const express = require('express');
const {
    createSchool,
    getSchools,
    updateSchool,
    deleteSchool,
} = require('../controllers/schoolController');

const router = express.Router();

// Rotas para Escolas
router.post('/', createSchool); // Criar uma nova escola
router.get('/', getSchools); // Listar todas as escolas
router.put('/:id', updateSchool); // Atualizar uma escola pelo ID
router.delete('/:id', deleteSchool); // Deletar uma escola pelo ID

module.exports = router;
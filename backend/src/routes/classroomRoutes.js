const express = require('express');
const {
    createClassroom,
    getClassrooms,
    updateClassroom,
    deleteClassroom,
} = require('../controllers/classroomController');

const router = express.Router();

// Rotas para Turmas
router.post('/', createClassroom); // Criar uma nova turma
router.get('/', getClassrooms); // Listar todas as turmas
router.put('/:id', updateClassroom); // Atualizar uma turma pelo ID
router.delete('/:id', deleteClassroom); // Deletar uma turma pelo ID

module.exports = router;
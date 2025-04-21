const Student = require("../models/Student");

// Criar um novo aluno
const createStudent = async (req, res) => {
    const { name, age, class: studentClass, guardian } = req.body;

    try {
        const student = await Student.create({
            name,
            age,
            class: studentClass,
            guardian,
        });

        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ message: "Erro ao criar aluno", error });
    }
};

// Listar todos os alunos
const getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar alunos", error });
    }
};

// Atualizar informações de um aluno
const updateStudent = async (req, res) => {
    const { id } = req.params;

    try {
        const student = await Student.findByIdAndUpdate(id, req.body, { new: true });

        if (!student) return res.status(404).json({ message: "Aluno não encontrado" });

        res.json(student);
    } catch (error) {
        res.status(400).json({ message: "Erro ao atualizar aluno", error });
    }
};

// Excluir um aluno
const deleteStudent = async (req, res) => {
    const { id } = req.params;

    try {
        const student = await Student.findByIdAndDelete(id);

        if (!student) return res.status(404).json({ message: "Aluno não encontrado" });

        res.json({ message: "Aluno excluído com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao excluir aluno", error });
    }
};

module.exports = { createStudent, getStudents, updateStudent, deleteStudent };
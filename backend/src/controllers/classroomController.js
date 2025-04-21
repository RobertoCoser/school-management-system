const Classroom = require("../models/Classroom");

// Criar uma nova turma
exports.createClassroom = async (req, res) => {
    try {
        const { name, school } = req.body;
        const classroom = new Classroom({ name, school });
        await classroom.save();
        res.status(201).json(classroom);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Listar todas as turmas
exports.getClassrooms = async (req, res) => {
    try {
        const classrooms = await Classroom.find().populate("school");
        res.status(200).json(classrooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar uma turma
exports.updateClassroom = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, school } = req.body;
        const classroom = await Classroom.findByIdAndUpdate(
            id,
            { name, school },
            { new: true }
        ).populate("school");
        if (!classroom) {
            return res.status(404).json({ error: "Turma não encontrada" });
        }
        res.status(200).json(classroom);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Deletar uma turma
exports.deleteClassroom = async (req, res) => {
    try {
        const { id } = req.params;
        const classroom = await Classroom.findByIdAndDelete(id);
        if (!classroom) {
            return res.status(404).json({ error: "Turma não encontrada" });
        }
        res.status(200).json({ message: "Turma deletada com sucesso" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
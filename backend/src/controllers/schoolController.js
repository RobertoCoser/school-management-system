const School = require("../models/School");

// Criar uma nova escola
exports.createSchool = async (req, res) => {
    try {
        const { name, address, phone } = req.body;
        const school = new School({ name, address, phone });
        await school.save();
        res.status(201).json(school);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Listar todas as escolas
exports.getSchools = async (req, res) => {
    try {
        const schools = await School.find();
        res.status(200).json(schools);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar uma escola
exports.updateSchool = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, phone } = req.body;
        const school = await School.findByIdAndUpdate(
            id,
            { name, address, phone },
            { new: true }
        );
        if (!school) {
            return res.status(404).json({ error: "Escola não encontrada" });
        }
        res.status(200).json(school);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Deletar uma escola
exports.deleteSchool = async (req, res) => {
    try {
        const { id } = req.params;
        const school = await School.findByIdAndDelete(id);
        if (!school) {
            return res.status(404).json({ error: "Escola não encontrada" });
        }
        res.status(200).json({ message: "Escola deletada com sucesso" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
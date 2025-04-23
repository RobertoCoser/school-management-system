const Student = require('../models/Student');
const asyncHandler = require('express-async-handler');

// @desc    Get all students
// @route   GET /api/students
// @access  Public
exports.getStudents = asyncHandler(async (req, res) => {
    const students = await Student.find().populate('class', 'name');
    res.status(200).json({
        success: true,
        count: students.length,
        data: students
    });
});

// @desc    Create student
// @route   POST /api/students
// @access  Private
exports.createStudent = asyncHandler(async (req, res) => {
    const student = await Student.create(req.body);
    res.status(201).json({
        success: true,
        data: student
    });
});

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Private
exports.updateStudent = asyncHandler(async (req, res) => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!student) {
        return res.status(404).json({
            success: false,
            message: 'Aluno não encontrado'
        });
    }

    res.status(200).json({
        success: true,
        data: student
    });
});

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private
exports.deleteStudent = asyncHandler(async (req, res) => {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: 'Aluno não encontrado'
        });
    }

    res.status(200).json({
        success: true,
        data: {}
    });
});
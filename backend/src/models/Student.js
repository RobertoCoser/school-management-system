const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        age: { type: Number, required: true },
        class: { type: String, required: true },
        guardian: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
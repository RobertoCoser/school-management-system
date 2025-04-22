import { useState, useEffect } from 'react';
import api from '../services/api';
import Modal from '../components/Modal';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import './Students.css';

const Students = () => {
    // Estados principais
    const [students, setStudents] = useState([]);
    const [name, setName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);

    // Constantes para paginação
    const itemsPerPage = 5;
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
    const paginatedStudents = filteredStudents.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Busca alunos na API
    useEffect(() => {
        const fetchStudents = async () => {
            const res = await api.get('/students');
            setStudents(res.data);
        };
        fetchStudents();
    }, []);

    // Adiciona novo aluno
    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post('/students', { name });
        setName('');
        const res = await api.get('/students');
        setStudents(res.data);
    };

    // Atualiza aluno existente
    const handleUpdate = async (e) => {
        e.preventDefault();
        await api.put(`/students/${editingStudent._id}`, { name: editingStudent.name });
        setIsModalOpen(false);
        const res = await api.get('/students');
        setStudents(res.data);
    };

    // Remove aluno
    const handleDelete = async (id) => {
        await api.delete(`/students/${id}`);
        const res = await api.get('/students');
        setStudents(res.data);
    };

    return (
        <div className="students-container">
            <h1>Gerenciamento de Alunos</h1>

            <SearchBar onSearch={setSearchTerm} />

            <form onSubmit={handleSubmit} className="student-form">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome do aluno"
                    required
                />
                <button type="submit">Adicionar Aluno</button>
            </form>

            <div className="students-list">
                {paginatedStudents.map((student) => (
                    <div key={student._id} className="student-card">
                        <span>{student.name}</span>
                        <div>
                            <button
                                onClick={() => {
                                    setEditingStudent(student);
                                    setIsModalOpen(true);
                                }}
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(student._id)}
                                className="delete-btn"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2>Editar Aluno</h2>
                <form onSubmit={handleUpdate}>
                    <input
                        type="text"
                        value={editingStudent?.name || ''}
                        onChange={(e) =>
                            setEditingStudent({
                                ...editingStudent,
                                name: e.target.value
                            })
                        }
                        placeholder="Nome do aluno"
                        required
                    />
                    <button type="submit">Salvar</button>
                </form>
            </Modal>
        </div>
    );
};

export default Students;
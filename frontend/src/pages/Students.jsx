import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import '../styles/global.css';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    // Busca alunos
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await api.get('/students');
                setStudents(response.data);
                setFilteredStudents(response.data);
            } catch (err) {
                setError('Falha ao carregar alunos');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
    }, []);

    // Filtra alunos localmente
    useEffect(() => {
        const filtered = students.filter(student =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredStudents(filtered);
        setCurrentPage(1); // Resetar paginação ao buscar
    }, [searchTerm, students]);

    // Paginação
    const itemsPerPage = 5;
    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
    const paginatedStudents = filteredStudents.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleDelete = async (id) => {
        try {
            await api.delete(`/students/${id}`);
            setStudents(students.filter(student => student._id !== id));
        } catch (err) {
            setError('Falha ao excluir aluno');
        }
    };

    if (loading) return <div className="loading">Carregando...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="students-container">
            <div className="students-header">
                <h1>Gerenciamento de Alunos</h1>
                <Link to="/students/new" className="add-button">
                    + Novo Aluno
                </Link>
            </div>

            <SearchBar
                onSearch={setSearchTerm}
                placeholder="Buscar por nome ou email..."
            />

            <div className="table-responsive">
                <table className="students-table">
                    {/* Cabeçalho mantido igual */}
                    <tbody>
                        {paginatedStudents.length > 0 ? (
                            paginatedStudents.map((student) => (
                                <tr key={student._id}>
                                    <td>{student.name}</td>
                                    <td>{student.email || '-'}</td>
                                    <td>{student.class?.name || '-'}</td>
                                    <td>
                                        <button
                                            className="edit-button"
                                            onClick={() => {
                                                setSelectedStudent(student);
                                                setIsModalOpen(true);
                                            }}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(student._id)}
                                            className="delete-button"
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="no-data">
                                    {searchTerm ? 'Nenhum resultado encontrado' : 'Nenhum aluno cadastrado'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {selectedStudent && (
                    <div className="modal-content">
                        <h2>Editar Aluno</h2>
                        {/* Formulário de edição aqui */}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Students;
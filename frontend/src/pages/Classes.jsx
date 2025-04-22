import { useState, useEffect } from 'react';
import api from '../services/api';

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const [className, setClassName] = useState('');

    useEffect(() => {
        const fetchClasses = async () => {
            const res = await api.get('/classes');
            setClasses(res.data);
        };
        fetchClasses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post('/classes', { name: className });
        setClassName('');
        // Atualiza a lista
        const res = await api.get('/classes');
        setClasses(res.data);
    };

    return (
        <div>
            <h1>Turmas</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    placeholder="Nome da turma"
                />
                <button type="submit">Criar Turma</button>
            </form>
            <ul>
                {classes.map((cls) => (
                    <li key={cls._id}>{cls.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Classes;
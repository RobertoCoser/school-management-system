import axios from 'axios';

const API_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';

console.log('API_URL:', API_URL);

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Adicionar rotas específicas conforme necessário
export const getStudents = () => api.get('/students');
export const getClasses = () => api.get('/classes');

export default api;
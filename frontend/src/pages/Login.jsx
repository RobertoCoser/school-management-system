import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/global.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            alert('Login falhou!');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"
                    required
                />
                <button type="submit">Entrar</button>
                <button
                    onClick={() => navigate('/register')}
                    style={{ marginLeft: '10px', background: '#4CAF50' }}
                >
                    Registrar
                </button>
                <p>
                    Não tem conta?
                    <span
                        style={{ color: 'blue', cursor: 'pointer', marginLeft: '5px' }}
                        onClick={() => navigate('/register')}
                    >
                        Registre-se aqui
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;
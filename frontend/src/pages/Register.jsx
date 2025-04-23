import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/global.css';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.password) {
            setError("Todos os campos são obrigatórios!");
            return false;
        }

        if (formData.password.length < 6) {
            setError("A senha deve ter no mínimo 6 caracteres");
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("As senhas não coincidem!");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Erro no registro");
            }

            navigate('/login');
        } catch (err) {
            setError(err.message || "Erro ao conectar com o servidor");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h1>Criar Nova Conta</h1>
            
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nome Completo</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Digite seu nome"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Senha</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Mínimo 6 caracteres"
                        minLength="6"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar Senha</label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Repita sua senha"
                        required
                    />
                </div>

                <button 
                    type="submit" 
                    className="submit-button"
                    disabled={isLoading}
                >
                    {isLoading ? 'Registrando...' : 'Criar Conta'}
                </button>
            </form>

            <div className="auth-footer">
                Já tem uma conta?{' '}
                <Link to="/login" className="auth-link">
                    Entrar
                </Link>
            </div>
        </div>
    );
}
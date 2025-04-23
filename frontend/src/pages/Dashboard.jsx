import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => (
  <div className="dashboard">
    <h1>Bem-vindo ao Painel</h1>
    <div className="quick-links">
      <Link to="/students">Gerenciar Alunos</Link>
      <Link to="/classrooms">Gerenciar Turmas</Link>
    </div>
  </div>
);

export default Dashboard;
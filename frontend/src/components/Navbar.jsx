import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/dashboard">School Manager</Link>
      </div>
      <div className="navbar-links">
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/students" className="nav-link">Alunos</Link>
        <Link to="/classes" className="nav-link">Turmas</Link>
      </div>
      <button 
        className="logout-button"
        onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/';
        }}
      >
        Sair
      </button>
    </nav>
  );
};

export default Navbar;
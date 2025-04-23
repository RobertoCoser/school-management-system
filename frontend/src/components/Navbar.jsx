import { Link, useLocation } from 'react-router-dom';
import '../styles/global.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/dashboard">School Manager</Link>
      </div>
      <div className="navbar-links">
        <Link
          to="/dashboard"
          className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
        >
          Dashboard
        </Link>
        <Link
          to="/students"
          className={`nav-link ${location.pathname === '/students' ? 'active' : ''}`}
        >
          Alunos
        </Link>
        <Link
          to="/classrooms"
          className={`nav-link ${location.pathname === '/classrooms' ? 'active' : ''}`}
        >
          Turmas
        </Link>
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
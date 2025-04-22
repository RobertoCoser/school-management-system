import { useEffect, useState } from 'react';
import api from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    students: 0,
    classes: 0,
    teachers: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/dashboard/stats');
        setStats(res.data);
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <h1>Visão Geral</h1>
      <div className="dashboard-cards">
        <div className="card">
          <h3>Alunos</h3>
          <p>{stats.students}</p>
        </div>
        <div className="card">
          <h3>Turmas</h3>
          <p>{stats.classes}</p>
        </div>
        <div className="card">
          <h3>Professores</h3>
          <p>{stats.teachers}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
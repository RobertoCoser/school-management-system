import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const Dashboard = () => {
    if (!isAuthenticated()) return <Navigate to="/" />;

    return <div>Bem-vindo ao Painel!</div>;
};
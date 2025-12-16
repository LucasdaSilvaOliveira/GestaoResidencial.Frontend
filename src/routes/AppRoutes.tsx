import { Routes, Route } from "react-router-dom";
import PessoasPage from "../pages/pessoas/PessoasPage";
import CategoriasPage from "../pages/categorias/CategoriasPage";
import TransacoesPage from "../pages/transacoes/TransacoesPage";
import DashboardPage from "../pages/dashboard/DashboardPage";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/pessoas" element={<PessoasPage />} />
            <Route path="/categorias" element={<CategoriasPage />} />
            <Route path="/transacoes" element={<TransacoesPage />} />
            <Route path="/" element={<DashboardPage />} />
        </Routes>
    );
}
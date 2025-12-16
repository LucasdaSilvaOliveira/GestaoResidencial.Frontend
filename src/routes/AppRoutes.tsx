import { Routes, Route } from "react-router-dom";
import PessoasPage from "../pages/pessoas/PessoasPage";
import CategoriasPage from "../pages/categorias/CategoriasPage";
import TransacoesPage from "../pages/transacoes/TransacoesPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import PessoasEditarPage from "../pages/pessoas/PessoasEditarPage";
import CategoriasEditarPage from "../pages/categorias/CategoriasEditarPage";
import TransacoesEditarPage from "../pages/transacoes/TransacoesEditarPage";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/pessoas" element={<PessoasPage />} />
            <Route path="/categorias" element={<CategoriasPage />} />
            <Route path="/transacoes" element={<TransacoesPage />} />
            <Route path="/" element={<DashboardPage />} />
            <Route path="/pessoas/editar/:id" element={<PessoasEditarPage />} />
            <Route path="/categorias/editar/:id" element={<CategoriasEditarPage />} />
            <Route path="/transacoes/editar/:id" element={<TransacoesEditarPage />} />
        </Routes>
    );
}
import { NavLink } from "react-router-dom";

export default function Header() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded transition
     ${isActive
       ? "bg-blue-600 text-white"
       : "text-gray-300 hover:bg-gray-700 hover:text-white"}`;

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-800 border-b border-gray-700 z-50">
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
        {/* LOGO / TÍTULO */}
        <h1 className="text-lg font-bold text-white">
          Gestão Residencial
        </h1>

        {/* MENU */}
        <nav className="flex gap-2">
          <NavLink to="/" className={linkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/categorias" className={linkClass}>
            Categorias
          </NavLink>

          <NavLink to="/transacoes" className={linkClass}>
            Transações
          </NavLink>

          <NavLink to="/pessoas" className={linkClass}>
            Pessoas
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

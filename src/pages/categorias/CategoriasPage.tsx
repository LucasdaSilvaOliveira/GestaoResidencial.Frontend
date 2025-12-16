import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategoria } from "../../api/categoria.service";

export type FinalidadeCategoria = 'Despesa' | 'Receita' | 'Ambas';

export default function CategoriasPage() {
  const [descricao, setDescricao] = useState("");
  const [finalidade, setFinalidade] = useState<number>(1);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!descricao) {
      alert("Preencha a descrição da categoria.");
      return;
    }

    try {
      await createCategoria({
        descricao,
        finalidade,
      });

      alert("Categoria cadastrada com sucesso!");
      // Redireciona para Dashboard
      navigate("/");

      // Limpa formulário
      setDescricao("");
      setFinalidade(1);
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar categoria.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 w-1/2 mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Cadastro de Categorias
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg mb-8 max-w-md m-auto"
      >
        {/* DESCRIÇÃO */}
        <div className="mb-4">
          <label className="block mb-1">Descrição</label>
          <textarea
            className="w-full p-2 rounded bg-gray-700 focus:outline-none"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        {/* FINALIDADE */}
        <div className="mb-4">
          <label className="block mb-1">Finalidade</label>
          <select
            className="w-full p-2 rounded bg-gray-700 focus:outline-none"
            value={finalidade}
            onChange={(e) => setFinalidade(Number(e.target.value))}
          >
            <option value={1}>Despesa</option>
            <option value={2}>Receita</option>
            <option value={3}>Ambas</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

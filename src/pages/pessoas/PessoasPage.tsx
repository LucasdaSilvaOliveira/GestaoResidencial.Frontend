import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirecionar
import { createPessoa } from "../../api/pessoa.service";

interface Pessoa {
  id: number;
  nome: string;
  idade: number;
}

export default function PessoasPage() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!nome || !idade) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      await createPessoa({
        nome,
        idade: Number(idade),
      });

      alert("Pessoa cadastrada com sucesso!");
      // Redireciona para Dashboard
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar pessoa.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 w-1/2 mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Cadastro de Pessoas</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg mb-8 max-w-md m-auto"
      >
        <div className="mb-4">
          <label className="block mb-1">Nome</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700 focus:outline-none"
            value={nome}
            onChange={e => setNome(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Idade</label>
          <input
            type="number"
            min={1}
            className="w-full p-2 rounded bg-gray-700 focus:outline-none"
            value={idade}
            onChange={e => setIdade(e.target.value)}
          />
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

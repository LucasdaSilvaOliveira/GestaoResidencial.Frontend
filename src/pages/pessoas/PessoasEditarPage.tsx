import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPessoaById, updatePessoa } from "../../api/pessoa.service";

export default function PessoasEditar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPessoa() {
      try {
        const pessoa = await getPessoaById(Number(id));
        setNome(pessoa.nome);
        setIdade(pessoa.idade);
      } catch (error) {
        console.error("Erro ao carregar pessoa", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPessoa();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await updatePessoa({
        id: Number(id),
        nome,
        idade,
      });

      navigate("/");
    } catch (error) {
      console.error("Erro ao atualizar pessoa", error);
    }
  }

  if (loading) {
    return <div className="text-white p-6">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 w-1/2 mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg w-full max-w-md space-y-4 m-auto"
      >
        <h1 className="text-xl font-semibold">Editar Pessoa</h1>

        <div>
          <label className="block mb-1">Nome</label>
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Idade</label>
          <input
            type="number"
            value={idade}
            onChange={(e) => setIdade(Number(e.target.value))}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
            required
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}

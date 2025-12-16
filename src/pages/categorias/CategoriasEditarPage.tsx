import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getCategoriaById,
  updateCategoria,
} from "../../api/categoria.service";

type Finalidade = "Despesa" | "Receita" | "Ambas";

export default function CategoriasEditar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [descricao, setDescricao] = useState("");
  const [finalidade, setFinalidade] = useState<Finalidade>("Despesa");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategoria() {
      try {
        const categoria = await getCategoriaById(Number(id));

        setDescricao(categoria.descricao);
        setFinalidade(categoria.finalidade as Finalidade); // ✅ agora funciona
      } catch (error) {
        console.error("Erro ao carregar categoria", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategoria();
  }, [id]);

  function mapFinalidadeToNumber(finalidade: Finalidade): number {
    switch (finalidade) {
      case "Despesa":
        return 1;
      case "Receita":
        return 2;
      case "Ambas":
        return 3;
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await updateCategoria({
        id: Number(id),
        descricao,
        finalidade: mapFinalidadeToNumber(finalidade), // ✅ conversão no submit
      });

      navigate("/");
    } catch (error) {
      console.error("Erro ao atualizar categoria", error);
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
        <h1 className="text-xl font-semibold">Editar Categoria</h1>

        <div>
          <label className="block mb-1">Descrição</label>
          <input
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Finalidade</label>
          <select
            value={finalidade}
            onChange={(e) =>
              setFinalidade(e.target.value as Finalidade)
            }
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
          >
            <option value="Despesa">Despesa</option>
            <option value="Receita">Receita</option>
            <option value="Ambas">Ambas</option>
          </select>
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

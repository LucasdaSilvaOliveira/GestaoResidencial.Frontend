import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPessoas } from "../../api/pessoa.service";
import { getCategorias } from "../../api/categoria.service";
import { createTransacao } from "../../api/transacao.service";

interface Pessoa {
  id: number;
  nome: string;
  idade: number;
}

export default function TransacoesPage() {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState<1 | 2>(1); // 1=Despesa, 2=Receita
  const [categoriaId, setCategoriaId] = useState<number | "">("");
  const [pessoaId, setPessoaId] = useState<number | "">("");

  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);

  const navigate = useNavigate();

  // 🔹 Carrega pessoas e categorias do backend
  useEffect(() => {
    async function fetchData() {
      try {
        const pessoasData = await getPessoas();
        setPessoas(pessoasData);

        const categoriasData = await getCategorias();

        setCategorias(categoriasData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
    fetchData();
  }, []);

  // 🔹 Pessoa selecionada
  const pessoaSelecionada = pessoas.find(p => p.id === pessoaId);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!descricao || !valor || !pessoaId || !categoriaId) {
      alert("Preencha todos os campos.");
      return;
    }

    // Regra: menor de idade não pode registrar receita
    if (pessoaSelecionada && pessoaSelecionada.idade < 18 && tipo === 2) {
      alert("Menores de idade não podem registrar receitas.");
      return;
    }

    try {

      await createTransacao({
        descricao,
        valor: Number(valor),
        tipo,
        categoriaId,
        pessoaId,
      });

      alert("Transação cadastrada com sucesso!");
      navigate("/"); // Redireciona para Dashboard

      // Limpa formulário
      setDescricao("");
      setValor("");
      setTipo(1);
      setCategoriaId("");
      setPessoaId("");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar transação.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 w-1/2 mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Cadastro de Transações
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg mb-8 max-w-md m-auto"
      >
        {/* DESCRIÇÃO */}
        <div className="mb-4">
          <label className="block mb-1">Descrição</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700 focus:outline-none"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
          />
        </div>

        {/* VALOR */}
        <div className="mb-4">
          <label className="block mb-1">Valor</label>
          <input
            type="number"
            min={0}
            step="0.01"
            className="w-full p-2 rounded bg-gray-700 focus:outline-none"
            value={valor}
            onChange={e => setValor(e.target.value)}
          />
        </div>

        {/* TIPO */}
        <div className="mb-4">
          <label className="block mb-1">Tipo</label>
          <select
            className="w-full p-2 rounded bg-gray-700 focus:outline-none"
            value={tipo}
            onChange={e => setTipo(Number(e.target.value) as 1 | 2)}
          >
            <option value={1}>Despesa</option>
            <option value={2}>Receita</option>
          </select>
        </div>

        {/* PESSOA */}
        <div className="mb-4">
          <label className="block mb-1">Pessoa</label>
          <select
            className="w-full p-2 rounded bg-gray-700 focus:outline-none"
            value={pessoaId}
            onChange={e => setPessoaId(Number(e.target.value))}
          >
            <option value="">Selecione</option>
            {pessoas.map(p => (
              <option key={p.id} value={p.id}>
                {p.nome} ({p.idade} anos)
              </option>
            ))}
          </select>
        </div>

        {/* CATEGORIA */}
        <div className="mb-4">
          <label className="block mb-1">Categoria</label>
          <select
            className="w-full p-2 rounded bg-gray-700 focus:outline-none"
            value={categoriaId}
            onChange={e => setCategoriaId(Number(e.target.value))}
          >
            <option value="">Selecione</option>
            {categorias.map(c => (
              <option key={c.id} value={c.id}>
                {c.descricao}
              </option>
            ))}
          </select>
        </div>

        {/* ALERTA MENOR DE IDADE */}
        {pessoaSelecionada && pessoaSelecionada.idade < 18 && tipo === 2 && (
          <p className="text-red-400 text-sm mb-4">
            Menores de idade não podem registrar receitas.
          </p>
        )}

        {pessoaSelecionada !== undefined ? (
          <button
            type="submit"
            disabled={pessoaSelecionada.idade < 18 && tipo === 2}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 p-2 rounded font-semibold"
          >
            Cadastrar
          </button>
        ) : (
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 p-2 rounded font-semibold"
          >
            Cadastrar
          </button>
        )}


      </form>
    </div>
  );
}

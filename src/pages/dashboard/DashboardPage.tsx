import { useEffect, useState } from "react";
import TotaisPorCategoria from "../../components/tables/TotaisPorCategoria";
import TotaisPorPessoa from "../../components/tables/TotaisPorPessoa";
import { getPessoas } from "../../api/pessoa.service";
import { getCategorias } from "../../api/categoria.service";
import { getTransacoes } from "../../api/transacao.service";
import type { PessoaModel } from "../../models/PessoaModel/PessoaModel";
import type { CategoriaModel } from "../../models/CategoriaModel/CategoriaModel";
import type { TransacaoModel } from "../../models/TransacaoModel/TransacaoModel";

export default function DashboardPage() {
  const [pessoas, setPessoas] = useState<PessoaModel[]>([]);
  const [categorias, setCategorias] = useState<CategoriaModel[]>([]);
  const [transacoes, setTransacoes] = useState<TransacaoModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [pessoasData, categoriasData, transacoesData] = await Promise.all([
          getPessoas(),
          getCategorias(),
          getTransacoes(),
        ]);
        setPessoas(pessoasData);
        setCategorias(categoriasData);
        setTransacoes(transacoesData);

      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div className="text-white p-6">Carregando dados...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white space-y-12 w-4/5 mx-auto py-8">
      {/* Totais */}
      <TotaisPorPessoa pessoas={pessoas} transacoes={transacoes} />
      <TotaisPorCategoria categorias={categorias} transacoes={transacoes} />


      {/* Listagem de Pessoas */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Pessoas</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700 text-gray-300">
              <th className="py-2">ID</th>
              <th className="py-2">Nome</th>
              <th className="py-2">Idade</th>
            </tr>
          </thead>
          <tbody>
            {pessoas.map((p) => (
              <tr key={p.id} className="border-b border-gray-700">
                <td className="py-2">{p.id}</td>
                <td className="py-2">{p.nome}</td>
                <td className="py-2">{p.idade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Listagem de Categorias */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Categorias</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700 text-gray-300">
              <th className="py-2">ID</th>
              <th className="py-2">Descrição</th>
              <th className="py-2">Finalidade</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((c) => (
              <tr key={c.id} className="border-b border-gray-700">
                <td className="py-2">{c.id}</td>
                <td className="py-2">{c.descricao}</td>
                <td className="py-2">{c.finalidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Listagem de Transações */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Transações</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700 text-gray-300">
              <th className="py-2">Pessoa</th>
              <th className="py-2">Categoria</th>
              <th className="py-2">Tipo</th>
              <th className="py-2">Valor</th>
            </tr>
          </thead>
          <tbody>
            {transacoes.map((t, i) => {
              const pessoa = pessoas.find((p) => p.id === t.pessoaId);
              const categoria = categorias.find((c) => c.id === t.categoriaId);
              return (
                <tr key={i} className="border-b border-gray-700">
                  <td className="py-2">{pessoa?.nome}</td>
                  <td className="py-2">{categoria?.descricao}</td>
                  <td className="py-2">{t.tipo}</td>
                  <td
                    className={`py-2 ${t.tipo === 1 ? "text-red-400" : "text-green-400"
                      }`}
                  >
                    R$ {t.valor.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

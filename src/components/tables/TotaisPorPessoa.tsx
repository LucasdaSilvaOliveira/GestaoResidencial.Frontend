interface Pessoa {
  id: number;
  nome: string;
}

interface Transacao {
  pessoaId: number;
  tipo: number | string; // 1=Despesa, 2=Receita
  valor: number;
}

interface Props {
  pessoas: Pessoa[];
  transacoes: Transacao[];
}

export default function TotaisPorPessoa({ pessoas, transacoes }: Props) {

  // Lógica para fazer o cálculo do total de receitas, despesas e o saldo (receita – despesa) de cada pessoa.
  const totais = pessoas.map(pessoa => {
    const receitas = transacoes
      .filter(t => t.pessoaId === pessoa.id && t.tipo === "Receita")
      .reduce((sum, t) => sum + t.valor, 0);

    const despesas = transacoes
      .filter(t => t.pessoaId === pessoa.id && t.tipo === "Despesa")
      .reduce((sum, t) => sum + t.valor, 0);

    return {
      pessoa: pessoa.nome,
      receitas,
      despesas,
      saldo: receitas - despesas,
    };
  });

  const totalReceitas = totais.reduce((s, t) => s + t.receitas, 0);
  const totalDespesas = totais.reduce((s, t) => s + t.despesas, 0);
  const saldoGeral = totalReceitas - totalDespesas;

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Totais por Pessoa</h2>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-700 text-gray-300">
            <th className="py-2">Pessoa</th>
            <th className="py-2">Receitas</th>
            <th className="py-2">Despesas</th>
            <th className="py-2">Saldo</th>
          </tr>
        </thead>

        <tbody>
          {totais.map((t, i) => (
            <tr key={i} className="border-b border-gray-700">
              <td className="py-2">{t.pessoa}</td>
              <td className="py-2 text-green-400">
                R$ {t.receitas.toFixed(2)}
              </td>
              <td className="py-2 text-red-400">
                R$ {t.despesas.toFixed(2)}
              </td>
              <td
                className={`py-2 ${t.saldo >= 0 ? "text-green-400" : "text-red-400"
                  }`}
              >
                R$ {t.saldo.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>

        {/* TOTAL GERAL */}
        <tfoot>
          <tr className="font-bold border-t border-gray-600">
            <td className="py-2">Total Geral</td>
            <td className="py-2 text-green-400">
              R$ {totalReceitas.toFixed(2)}
            </td>
            <td className="py-2 text-red-400">
              R$ {totalDespesas.toFixed(2)}
            </td>
            <td
              className={`py-2 ${saldoGeral >= 0 ? "text-green-400" : "text-red-400"
                }`}
            >
              R$ {saldoGeral.toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

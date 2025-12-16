import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    getTransacaoById,
    updateTransacao,
} from "../../api/transacao.service";
import { getPessoas } from "../../api/pessoa.service";
import { getCategorias } from "../../api/categoria.service";

type TipoTransacao = "Despesa" | "Receita";

export default function TransacoesEditar() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState<number>(0);
    const [tipo, setTipo] = useState<TipoTransacao>("Despesa");
    const [pessoaId, setPessoaId] = useState<number>(0);
    const [categoriaId, setCategoriaId] = useState<number>(0);

    const [pessoas, setPessoas] = useState<any[]>([]);
    const [categorias, setCategorias] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [transacao, pessoasData, categoriasData] =
                    await Promise.all([
                        getTransacaoById(Number(id)),
                        getPessoas(),
                        getCategorias(),
                    ]);

                setDescricao(transacao.descricao);
                setValor(transacao.valor);
                setTipo(transacao.tipo as TipoTransacao);
                setPessoaId(transacao.pessoaId);
                setCategoriaId(transacao.categoriaId);

                console.log(transacao)

                setPessoas(pessoasData);
                setCategorias(categoriasData);
            } catch (error) {
                console.error("Erro ao carregar transação", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [id]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            await updateTransacao({
                id: Number(id),
                descricao,
                valor,
                tipo,
                pessoaId,
                categoriaId,
            });

            navigate("/");
        } catch (error) {
            console.error("Erro ao atualizar transação", error);
        }
    }

    if (loading) {
        return <div className="text-white p-6">Carregando...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 w-1/2 mx-auto">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-6 rounded-lg w-full max-w-lg space-y-4 m-auto"
            >
                <h1 className="text-xl font-semibold">Editar Transação</h1>

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
                    <label className="block mb-1">Valor</label>
                    <input
                        type="number"
                        step="0.01"
                        value={valor}
                        onChange={(e) => setValor(Number(e.target.value))}
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Tipo</label>
                    <select
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value as TipoTransacao)}
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                    >
                        <option value="Despesa">Despesa</option>
                        <option value="Receita">Receita</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-1">Pessoa</label>
                    <select
                        value={pessoaId}
                        onChange={(e) => setPessoaId(Number(e.target.value))}
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                    >
                        {pessoas.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1">Categoria</label>
                    <select
                        value={categoriaId}
                        onChange={(e) => setCategoriaId(Number(e.target.value))}
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                    >
                        {categorias.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.descricao}
                            </option>
                        ))}
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

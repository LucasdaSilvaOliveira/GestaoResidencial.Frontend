export type TipoTransacao = 'Despesa' | 'Receita';

export interface TransacaoModel {
  id: number;
  descricao: string;
  valor: number;
  tipo: number | string;
  categoriaId: number;
  pessoaId: number;
}
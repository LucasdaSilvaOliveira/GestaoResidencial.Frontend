import type { TipoTransacao } from './TransacaoModel';

export interface CriarTransacaoModel {
  descricao: string;
  valor: number;
  tipo: number;
  categoriaId: number;
  pessoaId: number;
}
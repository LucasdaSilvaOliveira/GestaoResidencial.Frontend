export type FinalidadeCategoria = 'Despesa' | 'Receita' | 'Ambas';

export interface CategoriaModel {
  id: number;
  descricao: string;
  finalidade: number;
}

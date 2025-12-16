import api from './axios';
import type { CategoriaModel } from '../models/CategoriaModel/CategoriaModel';
import type { CriarCategoriaModel } from '../models/CategoriaModel/CriarCategoriaModel';

const ENDPOINT = '/Categoria';

/**
 * GET api/Categoria
 * Lista todas as categorias
 */
export const getCategorias = async (): Promise<CategoriaModel[]> => {
  const response = await api.get<CategoriaModel[]>(ENDPOINT);
  return response.data;
};

/**
 * GET api/Categoria/{id}
 * Retorna categoria por ID
 */
export const getCategoriaById = async (id: number): Promise<CategoriaModel> => {
  const response = await api.get<CategoriaModel>(`${ENDPOINT}/${id}`);
  return response.data;
};

/**
 * POST api/Categoria
 * Cria uma nova categoria
 */
export const createCategoria = async (
  dto: CriarCategoriaModel
): Promise<string> => {
  const response = await api.post<string>(ENDPOINT, dto);
  return response.data; // "Categoria registrada com sucesso."
};

/**
 * PUT api/Categoria/{id}
 * Atualiza categoria
 */
export const updateCategoria = async (categoria: CategoriaModel): Promise<void> => {
  await api.put(`${ENDPOINT}/${categoria.id}`, categoria);
};

/**
 * DELETE api/Categoria/{id}
 */
export const deleteCategoria = async (id: number): Promise<void> => {
  await api.delete(`${ENDPOINT}/${id}`);
};

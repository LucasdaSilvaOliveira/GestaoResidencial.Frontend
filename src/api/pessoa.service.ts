import api from './axios';
import type { PessoaModel } from '../models/PessoaModel/PessoaModel';
import type { CriarPessoaModel } from '../models/PessoaModel/CriarPessoaModel';

const ENDPOINT = '/Pessoa';

/**
 * GET api/Pessoa
 * Retorna todas as pessoas
 */
export const getPessoas = async (): Promise<PessoaModel[]> => {
  const response = await api.get<PessoaModel[]>(ENDPOINT);
  return response.data;
};

/**
 * GET api/Pessoa/{id}
 * Retorna uma pessoa por ID
 */
export const getPessoaById = async (id: number): Promise<PessoaModel> => {
  const response = await api.get<PessoaModel>(`${ENDPOINT}/${id}`);
  return response.data;
};

/**
 * POST api/Pessoa
 * Cria uma nova pessoa
 */
export const createPessoa = async (
  dto: CriarPessoaModel
): Promise<string> => {
  const response = await api.post<string>(ENDPOINT, dto);
  return response.data; // "Pessoa registrada com sucesso."
};

/**
 * PUT api/Pessoa/{id}
 * Atualiza uma pessoa
 */
export const updatePessoa = async (pessoa: PessoaModel): Promise<void> => {
  await api.put(`${ENDPOINT}/${pessoa.id}`, pessoa);
};

/**
 * DELETE api/Pessoa/{id}
 * Remove uma pessoa e suas transações
 */
export const deletePessoa = async (id: number): Promise<void> => {
  await api.delete(`${ENDPOINT}/${id}`);
};

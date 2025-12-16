import api from './axios';
import type { TransacaoModel } from '../models/TransacaoModel/TransacaoModel';
import type { CriarTransacaoModel } from '../models/TransacaoModel/CriarTransacaoModel';

const ENDPOINT = '/Transacao';

/**
 * GET api/Transacao
 * Lista todas as transações
 */
export const getTransacoes = async (): Promise<TransacaoModel[]> => {
  const response = await api.get<TransacaoModel[]>(ENDPOINT);
  return response.data;
};

/**
 * GET api/Transacao/{id}
 * Retorna transação por ID
 */
export const getTransacaoById = async (id: number): Promise<TransacaoModel> => {
  const response = await api.get<TransacaoModel>(`${ENDPOINT}/${id}`);
  return response.data;
};

/**
 * POST api/Transacao
 * Cria nova transação
 */
export const createTransacao = async (
  dto: CriarTransacaoModel
): Promise<string> => {
  const response = await api.post<string>(ENDPOINT, dto);
  return response.data; // "Transação registrada com sucesso."
};

/**
 * PUT api/Transacao/{id}
 * Atualiza transação
 */
export const updateTransacao = async (transacao: TransacaoModel): Promise<void> => {
  await api.put(`${ENDPOINT}/${transacao.id}`, transacao);
};

/**
 * DELETE api/Transacao/{id}
 */
export const deleteTransacao = async (id: number): Promise<void> => {
  await api.delete(`${ENDPOINT}/${id}`);
};

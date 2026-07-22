import api from "./api";
import type { Transacao, TipoTransacao } from "../types";

export async function listarTransacoes(): Promise<Transacao[]> {
  const response = await api.get<Transacao[]>("/transacoes");
  return response.data;
}

export async function criarTransacao(
  descricao: string,
  valor: number,
  tipo: TipoTransacao,
  pessoaId: string
): Promise<Transacao> {
  const response = await api.post<Transacao>("/transacoes", {
    descricao,
    valor,
    tipo,
    pessoaId,
  });
  return response.data;
}
// Tipos que espelham os DTOs do backend (ControleGastosAPI).

export type TipoTransacao = "Receita" | "Despesa";

export interface Pessoa {
  id: string; // Guid vem como string no JSON
  nome: string;
  idade: number;
}

export interface Transacao {
  id: string;
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  pessoaId: string;
}

export interface TotalPessoa {
  nome: string;
  receitas: number;
  despesas: number;
  saldo: number;
}

export interface TotaisResponse {
  pessoas: TotalPessoa[];
  totalReceitas: number;
  totalDespesas: number;
  saldoGeral: number;
}
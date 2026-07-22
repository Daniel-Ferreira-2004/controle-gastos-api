import api from "./api";
import type { Pessoa } from "../types";

// Funções que encapsulam as chamadas HTTP relacionadas a Pessoa,
// para não espalhar chamadas axios por dentro dos componentes.

export async function listarPessoas(): Promise<Pessoa[]> {
  const response = await api.get<Pessoa[]>("/pessoas");
  return response.data;
}

export async function criarPessoa(nome: string, idade: number): Promise<Pessoa> {
  const response = await api.post<Pessoa>("/pessoas", { nome, idade });
  return response.data;
}

export async function deletarPessoa(id: string): Promise<void> {
  await api.delete(`/pessoas/${id}`);
}
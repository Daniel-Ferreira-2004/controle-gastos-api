import { useEffect, useState } from "react";
import type { Pessoa } from "../types";
import { listarPessoas, criarPessoa, deletarPessoa } from "../services/pessoaService";
import { PessoaForm } from "../components/PessoaForm";
import { PessoaList } from "../components/PessoaList";

export function PessoasPage() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  // Busca as pessoas assim que a página carrega.
  useEffect(() => {
    carregarPessoas();
  }, []);

  async function carregarPessoas() {
    try {
      const dados = await listarPessoas();
      setPessoas(dados);
    } catch (err) {
      setErro("Erro ao carregar pessoas.");
    }
  }

  async function handleCadastrar(nome: string, idade: number) {
    try {
      await criarPessoa(nome, idade);
      await carregarPessoas(); // Recarrega a lista após cadastrar.
      setErro(null);
    } catch (err) {
      setErro("Erro ao cadastrar pessoa. Verifique os dados.");
    }
  }

  async function handleDeletar(id: string) {
    try {
      await deletarPessoa(id);
      await carregarPessoas(); // Recarrega a lista após excluir.
    } catch (err) {
      setErro("Erro ao excluir pessoa.");
    }
  }

  return (
    <div>
      <h2>Pessoas</h2>
      {erro && <p className="text-danger">{erro}</p>}
      <PessoaForm onCadastrar={handleCadastrar} />
      <PessoaList pessoas={pessoas} onDeletar={handleDeletar} />
    </div>
  );
}
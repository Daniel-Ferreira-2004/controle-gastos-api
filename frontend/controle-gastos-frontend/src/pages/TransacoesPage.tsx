import { useEffect, useState } from "react";
import type { Pessoa, Transacao, TipoTransacao } from "../types";
import { listarPessoas } from "../services/pessoaService";
import { listarTransacoes, criarTransacao } from "../services/transacaoService";
import { TransacaoForm } from "../components/TransacaoForm";
import { TransacaoList } from "../components/TransacaoList";

export function TransacoesPage() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      const [pessoasData, transacoesData] = await Promise.all([
        listarPessoas(),
        listarTransacoes(),
      ]);
      setPessoas(pessoasData);
      setTransacoes(transacoesData);
    } catch (err) {
      setErro("Erro ao carregar dados.");
    }
  }

  async function handleCadastrar(
    descricao: string,
    valor: number,
    tipo: TipoTransacao,
    pessoaId: string
  ) {
    try {
      await criarTransacao(descricao, valor, tipo, pessoaId);
      await carregarDados();
      setErro(null);
    } catch (err: any) {
      // O backend devolve 400 com uma mensagem específica quando
      // a regra de negócio (menor de idade só despesa) é violada.
      const mensagem =
        err.response?.data ?? "Erro ao cadastrar transação.";
      setErro(mensagem);
    }
  }

  return (
    <div>
      <h2>Transações</h2>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <TransacaoForm pessoas={pessoas} onCadastrar={handleCadastrar} />
      <TransacaoList transacoes={transacoes} pessoas={pessoas} />
    </div>
  );
}
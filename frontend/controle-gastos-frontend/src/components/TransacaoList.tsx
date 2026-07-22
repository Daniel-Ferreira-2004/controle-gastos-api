import type { Pessoa, Transacao } from "../types";

interface TransacaoListProps {
  transacoes: Transacao[];
  pessoas: Pessoa[];
}

export function TransacaoList({ transacoes, pessoas }: TransacaoListProps) {
  // Busca o nome da pessoa a partir do pessoaId da transação.
  function nomeDaPessoa(pessoaId: string): string {
    const pessoa = pessoas.find((p) => p.id === pessoaId);
    return pessoa ? pessoa.nome : "Desconhecida";
  }

  return (
    <div>
      <h3>Transações</h3>
      <ul>
        {transacoes.map((transacao) => (
          <li key={transacao.id}>
            [{transacao.tipo}] {transacao.descricao} — R${" "}
            {transacao.valor.toFixed(2)} ({nomeDaPessoa(transacao.pessoaId)})
          </li>
        ))}
      </ul>
    </div>
  );
}
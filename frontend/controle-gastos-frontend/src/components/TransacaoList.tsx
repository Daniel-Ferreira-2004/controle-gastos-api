import type { Pessoa, Transacao } from "../types";

interface TransacaoListProps {
  transacoes: Transacao[];
  pessoas: Pessoa[];
}

export function TransacaoList({ transacoes, pessoas }: TransacaoListProps) {
  function nomeDaPessoa(pessoaId: string): string {
    const pessoa = pessoas.find((p) => p.id === pessoaId);
    return pessoa ? pessoa.nome : "Desconhecida";
  }

  return (
    <div>
      <h3 className="h5 mb-3">Transações</h3>

      {transacoes.length === 0 && (
        <p className="text-secondary">Nenhuma transação cadastrada ainda.</p>
      )}

      <ul className="list-group">
        {transacoes.map((transacao) => (
          <li
            key={transacao.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              <span
                className={`badge me-2 ${
                  transacao.tipo === "Receita" ? "bg-success" : "bg-danger"
                }`}
              >
                {transacao.tipo}
              </span>
              {transacao.descricao}{" "}
              <span className="text-secondary">
                ({nomeDaPessoa(transacao.pessoaId)})
              </span>
            </span>
            <strong>R$ {transacao.valor.toFixed(2)}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
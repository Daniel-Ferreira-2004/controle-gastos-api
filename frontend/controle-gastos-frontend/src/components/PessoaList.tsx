import type { Pessoa } from "../types";

interface PessoaListProps {
  pessoas: Pessoa[];
  onDeletar: (id: string) => void;
}

export function PessoaList({ pessoas, onDeletar }: PessoaListProps) {
  return (
    <div>
      <h3 className="h5 mb-3">Pessoas Cadastradas</h3>

      {pessoas.length === 0 && (
        <p className="text-secondary">Nenhuma pessoa cadastrada ainda.</p>
      )}

      <ul className="list-group">
        {pessoas.map((pessoa) => (
          <li
            key={pessoa.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              {pessoa.nome} <span className="text-secondary">({pessoa.idade} anos)</span>
            </span>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => onDeletar(pessoa.id)}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
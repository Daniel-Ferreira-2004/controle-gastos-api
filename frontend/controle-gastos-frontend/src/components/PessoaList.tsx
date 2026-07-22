import type { Pessoa } from "../types";

interface PessoaListProps {
  pessoas: Pessoa[];
  onDeletar: (id: string) => void;
}

export function PessoaList({ pessoas, onDeletar }: PessoaListProps) {
  return (
    <div>
      <h3>Pessoas Cadastradas</h3>
      <ul>
        {pessoas.map((pessoa) => (
          <li key={pessoa.id}>
            {pessoa.nome} ({pessoa.idade} anos){" "}
            <button onClick={() => onDeletar(pessoa.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
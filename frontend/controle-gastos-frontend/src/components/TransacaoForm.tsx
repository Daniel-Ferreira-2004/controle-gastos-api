import { useState } from "react";
import type { FormEvent } from "react";
import type { Pessoa, TipoTransacao } from "../types";

interface TransacaoFormProps {
  pessoas: Pessoa[];
  onCadastrar: (
    descricao: string,
    valor: number,
    tipo: TipoTransacao,
    pessoaId: string
  ) => void;
}

export function TransacaoForm({ pessoas, onCadastrar }: TransacaoFormProps) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState<TipoTransacao>("Despesa");
  const [pessoaId, setPessoaId] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!descricao || !valor || !pessoaId) return;

    onCadastrar(descricao, Number(valor), tipo, pessoaId);

    setDescricao("");
    setValor("");
    setTipo("Despesa");
    setPessoaId("");
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>Cadastrar Transação</h3>

      <div>
        <label>Descrição: </label>
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </div>

      <div>
        <label>Valor: </label>
        <input
          type="number"
          step="0.01"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
      </div>

      <div>
        <label>Tipo: </label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value as TipoTransacao)}
        >
          <option value="Despesa">Despesa</option>
          <option value="Receita">Receita</option>
        </select>
      </div>

      <div>
        <label>Pessoa: </label>
        <select
          value={pessoaId}
          onChange={(e) => setPessoaId(e.target.value)}
        >
          <option value="">Selecione...</option>
          {pessoas.map((pessoa) => (
            <option key={pessoa.id} value={pessoa.id}>
              {pessoa.nome} ({pessoa.idade} anos)
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Cadastrar</button>
    </form>
  );
}
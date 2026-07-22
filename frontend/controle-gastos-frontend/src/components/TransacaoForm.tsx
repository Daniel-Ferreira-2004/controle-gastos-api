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
    <form onSubmit={handleSubmit} className="mb-4">
      <h3 className="h5 mb-3">Cadastrar Transação</h3>

      <div className="row g-2 align-items-end">
        <div className="col-md-3">
          <label className="form-label">Descrição</label>
          <input
            type="text"
            className="form-control"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <label className="form-label">Valor</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <label className="form-label">Tipo</label>
          <select
            className="form-select"
            value={tipo}
            onChange={(e) => setTipo(e.target.value as TipoTransacao)}
          >
            <option value="Despesa">Despesa</option>
            <option value="Receita">Receita</option>
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label">Pessoa</label>
          <select
            className="form-select"
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

        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">
            Cadastrar
          </button>
        </div>
      </div>
    </form>
  );
}
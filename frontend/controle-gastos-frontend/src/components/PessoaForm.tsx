import { useState } from "react";
import type { FormEvent } from "react";

interface PessoaFormProps {
  onCadastrar: (nome: string, idade: number) => void;
}

export function PessoaForm({ onCadastrar }: PessoaFormProps) {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!nome || !idade) return;

    onCadastrar(nome, Number(idade));

    setNome("");
    setIdade("");
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h3 className="h5 mb-3">Cadastrar Pessoa</h3>

      <div className="row g-2 align-items-end">
        <div className="col-md-5">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Idade</label>
          <input
            type="number"
            className="form-control"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
          />
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
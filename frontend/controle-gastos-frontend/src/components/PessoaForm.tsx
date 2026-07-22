import { useState } from "react";
import type { FormEvent } from "react";

interface PessoaFormProps {
  onCadastrar: (nome: string, idade: number) => void;
}

// Formulário simples para cadastrar uma nova pessoa.
// O componente pai (PessoasPage) decide o que fazer com os dados
// através da função onCadastrar recebida por prop.
export function PessoaForm({ onCadastrar }: PessoaFormProps) {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!nome || !idade) return;

    onCadastrar(nome, Number(idade));

    // Limpa o formulário depois de enviar.
    setNome("");
    setIdade("");
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>Cadastrar Pessoa</h3>

      <div>
        <label>Nome: </label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>

      <div>
        <label>Idade: </label>
        <input
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
        />
      </div>

      <button type="submit">Cadastrar</button>
    </form>
  );
}
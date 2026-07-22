import { useEffect, useState } from "react";
import type { TotaisResponse } from "../types";
import { buscarTotais } from "../services/totaisService";

export function TotaisPage() {
  const [totais, setTotais] = useState<TotaisResponse | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    carregarTotais();
  }, []);

  async function carregarTotais() {
    try {
      const dados = await buscarTotais();
      setTotais(dados);
    } catch (err) {
      setErro("Erro ao carregar totais.");
    }
  }

  if (erro) return <p style={{ color: "red" }}>{erro}</p>;
  if (!totais) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Totais</h2>

      <table border={1} cellPadding={8} style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Pessoa</th>
            <th>Receitas</th>
            <th>Despesas</th>
            <th>Saldo</th>
          </tr>
        </thead>
        <tbody>
          {totais.pessoas.map((pessoa) => (
            <tr key={pessoa.nome}>
              <td>{pessoa.nome}</td>
              <td>R$ {pessoa.receitas.toFixed(2)}</td>
              <td>R$ {pessoa.despesas.toFixed(2)}</td>
              <td>R$ {pessoa.saldo.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Total Geral</h3>
      <p>Total Receitas: R$ {totais.totalReceitas.toFixed(2)}</p>
      <p>Total Despesas: R$ {totais.totalDespesas.toFixed(2)}</p>
      <p>Saldo Geral: R$ {totais.saldoGeral.toFixed(2)}</p>
    </div>
  );
}
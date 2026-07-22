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

  if (erro) return <p className="text-danger">{erro}</p>;
  if (!totais) return <p className="text-secondary">Carregando...</p>;

  return (
    <div>
      <h2 className="h4 mb-3">Totais</h2>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
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
                <td className="text-success">R$ {pessoa.receitas.toFixed(2)}</td>
                <td className="text-danger">R$ {pessoa.despesas.toFixed(2)}</td>
                <td>
                  <strong>R$ {pessoa.saldo.toFixed(2)}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="row mt-4">
        <div className="col-md-4">
          <div className="p-3 bg-body-tertiary rounded">
            <div className="text-secondary">Total Receitas</div>
            <div className="h4 text-success">R$ {totais.totalReceitas.toFixed(2)}</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 bg-body-tertiary rounded">
            <div className="text-secondary">Total Despesas</div>
            <div className="h4 text-danger">R$ {totais.totalDespesas.toFixed(2)}</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 bg-body-tertiary rounded">
            <div className="text-secondary">Saldo Geral</div>
            <div className="h4">R$ {totais.saldoGeral.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
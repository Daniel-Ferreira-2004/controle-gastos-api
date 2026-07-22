import { useState } from "react";
import { PessoasPage } from "./pages/PessoasPage";
import { TransacoesPage } from "./pages/TransacoesPage";
import { TotaisPage } from "./pages/TotaisPage";

type Aba = "pessoas" | "transacoes" | "totais";

function App() {
  const [abaAtiva, setAbaAtiva] = useState<Aba>("pessoas");

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center">💰 Controle de Gastos</h1>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${abaAtiva === "pessoas" ? "active" : ""}`}
            onClick={() => setAbaAtiva("pessoas")}
          >
            Pessoas
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${abaAtiva === "transacoes" ? "active" : ""}`}
            onClick={() => setAbaAtiva("transacoes")}
          >
            Transações
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${abaAtiva === "totais" ? "active" : ""}`}
            onClick={() => setAbaAtiva("totais")}
          >
            Totais
          </button>
        </li>
      </ul>

      <div className="card-custom">
        {abaAtiva === "pessoas" && <PessoasPage />}
        {abaAtiva === "transacoes" && <TransacoesPage />}
        {abaAtiva === "totais" && <TotaisPage />}
      </div>
    </div>
  );
}

export default App;
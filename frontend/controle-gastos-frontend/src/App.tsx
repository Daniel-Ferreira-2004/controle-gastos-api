import { PessoasPage } from "./pages/PessoasPage";
import { TransacoesPage } from "./pages/TransacoesPage";
import { TotaisPage } from "./pages/TotaisPage";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Controle de Gastos</h1>
      <PessoasPage />
      <hr />
      <TransacoesPage />
      <hr />
      <TotaisPage />
    </div>
  );
}

export default App;
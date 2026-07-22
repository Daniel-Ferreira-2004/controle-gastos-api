# Controle de Gastos

Sistema de controle de gastos residenciais, com cadastro de pessoas, cadastro de transações (receitas e despesas) e consulta de totais por pessoa e geral.

## Tecnologias utilizadas

**Back-end**
- .NET 9 / C#
- Entity Framework Core
- SQLite (persistência local)
- Swagger (documentação/testes da API)

**Front-end**
- React + TypeScript
- Vite
- Bootstrap 5
- Axios

## Estrutura do projeto

```
ControleGastosAPI/
├── backend/
│   └── ControleGastosAPI/            API .NET
│       ├── Controllers/
│       ├── Models/
│       ├── DTOs/
│       ├── Data/
│       └── Migrations/
└── frontend/
    └── controle-gastos-frontend/     Aplicação React
        └── src/
            ├── components/
            ├── pages/
            ├── services/
            └── types/
```

## Como rodar o back-end

1. Acesse a pasta do back-end:
   ```bash
   cd ControleGastosAPI
   ```

2. Restaure os pacotes e aplique as migrations:
   ```bash
   dotnet restore
   dotnet ef database update
   ```

3. Execute a aplicação:
   ```bash
   dotnet run
   ```

4. A API estará disponível em `https://localhost:7105` (a porta pode variar; confira no console ao iniciar, na linha "Now listening on").

5. A documentação interativa (Swagger) fica em `https://localhost:7105/swagger`.

> Os dados são persistidos em SQLite (`controle.db`), gerado automaticamente na primeira execução, na raiz da pasta do back-end.

## Como rodar o front-end

1. Acesse a pasta do front-end:
   ```bash
   cd frontend/controle-gastos-frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute a aplicação:
   ```bash
   npm run dev
   ```

4. Acesse `http://localhost:5173` no navegador.

> **Importante:** o back-end precisa estar rodando simultaneamente para o front-end funcionar, já que ele consome a API em `https://localhost:7105`.

## Funcionalidades

### Cadastro de Pessoas
- Criação, listagem e exclusão.
- Ao excluir uma pessoa, todas as suas transações são excluídas automaticamente (exclusão em cascata).

### Cadastro de Transações
- Criação e listagem (edição/exclusão não são exigidas pelo desafio).
- Regra de negócio: pessoas menores de 18 anos só podem cadastrar transações do tipo **Despesa**.

### Consulta de Totais
- Exibe o total de receitas, despesas e saldo de cada pessoa.
- Exibe o total geral (soma de todas as pessoas).

## Endpoints da API

| Método | Rota                | Descrição                             |
|--------|----------------------|----------------------------------------|
| GET    | /api/pessoas         | Lista todas as pessoas                |
| POST   | /api/pessoas         | Cadastra uma nova pessoa              |
| DELETE | /api/pessoas/{id}    | Remove uma pessoa (e suas transações) |
| GET    | /api/transacoes      | Lista todas as transações             |
| POST   | /api/transacoes      | Cadastra uma nova transação           |
| GET    | /api/totais          | Consulta os totais por pessoa e geral |

## Decisões técnicas

**Guid como identificador**
Pessoas e Transações usam `Guid` em vez de `int` auto-incremento. Isso permite gerar o identificador no momento da criação do objeto (antes mesmo de persistir no banco) e evita qualquer possibilidade de colisão de IDs.

**DTOs (Data Transfer Objects)**
As entidades `Pessoa` e `Transacao` possuem um relacionamento de mão dupla (uma Pessoa tem uma lista de Transações, e cada Transação referencia sua Pessoa de volta). Expor essas entidades diretamente pela API geraria referência circular na serialização JSON. Por isso, tanto a entrada quanto a saída dos endpoints usam DTOs específicos (`CriarPessoaDto`, `CriarTransacaoDto`, `TransacaoRespostaDto`, `TotalPessoaDto`, `TotaisResponseDto`), contendo apenas os dados necessários para cada operação.

**Exclusão em cascata**
Configurada via Fluent API no `AppDbContext` (`OnDelete(DeleteBehavior.Cascade)`), delegando ao próprio banco de dados a responsabilidade de remover as transações vinculadas quando uma pessoa é excluída, sem necessidade de lógica adicional no Controller.

**Enum para o tipo de transação**
`TipoTransacao` (Receita/Despesa) é um enum, e não uma string livre, evitando valores inválidos. A API foi configurada para aceitar e retornar esse valor como texto (`"Receita"`/`"Despesa"`) em vez de número, tornando as requisições mais legíveis.

**Validação da regra de menor de idade**
A verificação de que menores de 18 anos só podem cadastrar Despesas é feita no `TransacoesController`, antes de persistir a transação, retornando `400 Bad Request` com uma mensagem explicativa caso a regra seja violada.

**CORS**
Configurado no back-end para permitir requisições vindas do front-end em desenvolvimento (`http://localhost:5173`), já que ambos rodam em portas diferentes.

## Observações

- Não há edição ou exclusão de transações, pois não são exigidas pelo desafio.
- A tela de Totais não é atualizada em tempo real ao cadastrar novas pessoas/transações em outras abas; é necessário recarregar a página.

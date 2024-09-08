## Projeto: Savings

### Descrição do Projeto

Este projeto é um sistema de gerenciamento financeiro pessoal que permite aos usuários registrar e monitorar suas despesas, ganhos, dívidas e investimentos. O sistema oferece uma interface amigável para visualizar transações, controlar limites de gastos, acompanhar metas financeiras e gerenciar uma lista de desejos. A aplicação é composta por um backend desenvolvido em Golang e um frontend construído com React.js.

### Funcionalidades Principais

#### Backend (Golang)

1. **Registro de Transações:**

   - Permite registrar despesas fixas e variáveis, ganhos, dívidas e investimentos.
   - Campos: Valor, Descrição, Data, Categoria (Despesa Fixa, Despesa Variável, Ganho, Dívida, Investimento).

2. **Controle de Limite de Gastos:**

   - Definir e monitorar limites de gastos mensais.

3. **Calendário de Vencimentos:**

   - Registro e visualização de datas de vencimento de contas e despesas.

4. **Controle de Compras no Cartão de Crédito:**

   - Registro e monitoramento de despesas feitas com cartões de crédito.

5. **Lista de Desejos e Metas Financeiras:**
   - Definição e acompanhamento de metas financeiras e lista de desejos.

#### Frontend (React.js)

1. **Registro e Visualização de Transações:**

   - Interface para adicionar, editar e visualizar transações.

2. **Controle de Saldo e Limite de Gastos:**

   - Exibição do saldo atual e monitoramento do limite de gastos.

3. **Calendário de Vencimentos:**

   - Visualização de eventos e vencimentos no calendário.

4. **Controle de Compras no Cartão de Crédito:**

   - Registro e monitoramento de despesas no cartão de crédito.

5. **Gerenciamento de Metas Financeiras e Lista de Desejos:**
   - Interface para definir e acompanhar metas financeiras e itens da lista de desejos.

### Estrutura do Projeto

#### Backend: Golang

- **Modelos:**

  - `transaction.go`: Modelos para despesas fixas, variáveis, ganhos, dívidas e investimentos.
  - `calendarEvent.go`: Modelos para eventos do calendário.
  - `creditCardExpense.go`: Modelos para despesas no cartão de crédito.
  - `financialGoal.go`: Modelos para metas financeiras.
  - `spendingLimit.go`: Modelos para limite de gastos.
  - `wishItem.go`: Modelos para itens da lista de desejos.

- **Controladores:**

  - `transactionController.go`: Lidar com operações de transações.
  - `calendarController.go`: Gerenciar eventos do calendário.
  - `financialGoalController.go`: Gerenciar metas financeiras.
  - `creditCardController.go`: Lidar com despesas no cartão de crédito.
  - `spendingLimitController.go`: Gerenciar limites de gastos.
  - `wishListController.go`: Gerenciar lista de desejos.

- **Rotas:**

  - `routes.go`: Definição das rotas da API.

- **Endpoints Essenciais:**
  - **POST /transactions:** Registro de uma nova transação.
  - **GET /transactions:** Obtenção de todas as transações.
  - **PUT /transactions/:id:** Atualização de uma transação.
  - **DELETE /transactions/:id:** Exclusão de uma transação.
  - **GET /calendar:** Obtenção dos eventos do calendário.
  - **POST /calendar:** Criação de um novo evento no calendário.
  - **GET /credit-card-expenses:** Obtenção de despesas no cartão.
  - **POST /credit-card-expenses:** Registro de uma nova despesa no cartão.
  - **GET /financial-goals:** Obtenção das metas financeiras.
  - **POST /financial-goals:** Criação de uma nova meta financeira.
  - **GET /spending-limits:** Obtenção dos limites de gastos.
  - **POST /spending-limits:** Definição de um novo limite de gastos.
  - **GET /wish-list:** Obtenção dos itens da lista de desejos.
  - **POST /wish-list:** Adição de um novo item à lista de desejos.

#### Frontend: React.js

- **Componentes Essenciais:**

  - `TransactionForm.js`: Formulário para adicionar ou editar transações.
  - `TransactionList.js`: Lista de transações.
  - `BalanceDisplay.js`: Exibição do saldo atual.
  - `Calendar.js`: Visualização de eventos do calendário.
  - `CreditCardExpense.js`: Registro e exibição de despesas no cartão.
  - `FinancialGoals.js`: Definição e acompanhamento de metas financeiras.
  - `SpendingLimit.js`: Definição e monitoramento de limites de gastos.
  - `WishList.js`: Gerenciamento da lista de desejos.
  - `YearMonthSelector.js`: Seleção de ano e mês para filtro de dados.

- **Páginas:**

  - `Home.js`: Página inicial com visão geral das finanças.
  - `Transactions.js`: Página para gerenciar transações.
  - `Calendar.js`: Página para visualizar o calendário.
  - `CreditCard.js`: Página para gerenciar despesas no cartão de crédito.
  - `Goals.js`: Página para gerenciar metas financeiras.
  - `WishList.js`: Página para gerenciar a lista de desejos.

- **Serviços:**
  - `api.js`: Serviço para fazer requisições HTTP ao backend.

### Desenvolvimento

#### Backend (Golang)

1. **Configuração do Projeto:**

   - Inicialize um novo projeto Go (`go mod init savings-backend`).
   - Instale as dependências (`gin`, `gorm`, `jwt-go`).

2. **Configuração do Banco de Dados:**

   - Configure a conexão com o PostgreSQL em `database.go`.
   - Defina os modelos para as entidades principais (`Transaction`, `CalendarEvent`, `CreditCardExpense`, `FinancialGoal`, `SpendingLimit`, `WishItem`).

3. **Rotas e Controladores:**

   - Configure as rotas em `routes/`.
   - Implemente os controladores para manipular as transações e outros recursos.

4. **Autenticação:**

   - Implemente a geração e verificação de tokens JWT.

5. **Testes e Deploy:**
   - Teste os endpoints usando Postman ou Insomnia.
   - Implemente testes unitários.
   - Prepare para deploy (Dockerfile, Heroku, etc.).

#### Frontend (React.js)

1. **Configuração do Projeto:**

   - Inicialize o projeto React (`npx create-react-app savings-frontend`).
   - Instale Material-UI e outras dependências necessárias.

2. **Componentização:**

   - Crie os componentes reutilizáveis para formulário de transações, lista de transações, exibição de saldo, etc.

3. **Estilização e Responsividade:**

   - Utilize Material-UI para criar um design limpo e responsivo.

4. **Integração com Backend:**

   - Utilize `axios` para fazer as requisições à API.
   - Mantenha o estado global da aplicação com `Context API` ou `Redux` (se necessário).

5. **Testes e Deploy:**
   - Teste a aplicação em diferentes navegadores e dispositivos.
   - Prepare para deploy (Vercel, Netlify, etc.).

### Estrutura de Diretórios

#### Backend

```
savings-backend/
├── controllers/
│   ├── transactionController.go
│   ├── calendarController.go
│   ├── financialGoalController.go
│   ├── creditCardController.go
│   ├── spendingLimitController.go
│   └── wishListController.go
│
├── models/
│   ├── transaction.go
│   ├── calendarEvent.go
│   ├── creditCardExpense.go
│   ├── database.go
│   ├── financialGoal.go
│   ├── spendingLimit.go
│   └── wishItem.go
│
├── routes/
│   └── routes.go
│
├── middlewares/
│   └── authMiddleware.go
│
├── main.go
```

#### Frontend

```
savings-frontend/
├── src/
│   ├── components/
│   │   ├── TransactionForm.js
│   │   ├── TransactionList.js
│   │   ├── BalanceDisplay.js
│   │   ├── Calendar.js
│   │   ├── CreditCardExpense.js
│   │   ├── FinancialGoals.js
│   │   ├── SpendingLimit.js
│   │   ├── WishList.js
│   │   └── YearMonthSelector.js
│   │
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Transactions.js
│   │   ├── Calendar.js
│   │   ├── CreditCard.js
│   │   ├── Goals.js
│   │   └── WishList.js
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.js
│   ├── index.js
│   └── App.css
```

### Tecnologias Utilizadas

#### Backend

- **Golang:** Linguagem de programação para construção do backend.
- **Gin:** Framework para criação de APIs RESTful.
- \*\*

Gorm:\*\* ORM para interagir com o banco de dados PostgreSQL.

- **JWT:** Para autenticação baseada em token.
- **PostgreSQL:** Banco de dados relacional.

#### Frontend

- **React.js:** Biblioteca para construção da interface de usuário.
- **Material-UI:** Biblioteca de componentes para estilização.
- **Axios:** Cliente HTTP para realizar requisições ao backend.

### Conclusão

O meu objetivo com este projeto visa proporcionar uma ferramenta eficaz e fácil de usar para o gerenciamento financeiro pessoal. Com uma interface amigável e funcionalidades robustas, os usuários poderão controlar melhor suas finanças, atingir metas financeiras e tomar decisões mais informadas sobre seus gastos e investimentos.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo `LICENSE` para mais informações.

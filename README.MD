Bank Keyboard

### Um teclado virtual desenvolvido com React no FrontEnd, Node.js no BackEnd e PostgreSQL como banco de dados.

### 🛠 Tecnologias Utilizadas

- **FrontEnd:** React.js

- **BackEnd:** Node.js com Express

- **Banco de Dados:** PostgreSQL

### 📌 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- **Node.js** (versão recomendada: LTS)

- **PostgreSQL** (versão recomendada: 13+)

- **Git**

### 🚀 Instalação e Configuração

### 1️⃣ Clonar o Repositório

```sh
git clone https://github.com/Alchini/Bank_Keyboard.git
cd Bank_Keyboard
```

### 2️⃣ Configuração do BackEnd (Node.js)

```sh
cd backend
npm install   # Instala as dependências
```
```sh
npm run migrate  # Executa as migrações do banco de dados
npm start        # Inicia o servidor
```

### 3️⃣ Configuração do Banco de Dados:

Certifique-se de que o PostgreSQL está rodando.

Crie um banco de dados.

Voce deve configurar as Informações do seu banco a partir do Documento .env conforme Exemplo

```sh
PORT=3001
DB_USER=postgres
DB_HOST=localhost
DB_NAME=bank_key
DB_PASSWORD=senhaBanco
DB_PORT=portaBanco
```

Depois para Conectar ao bancp

```sh
psql -U postGress senhaBanco
\c bank_key
```

### 4️⃣ Configuração do FrontEnd (React)

```sh
 cd ../frontend
 npm install   # Instala as dependências
 npm start     # Inicia o servidor de desenvolvimento
```

### 🎯 Uso

Após iniciar o backend e o frontend, a aplicação estará disponível em http://localhost:3000 (por padrão).

### 📜 Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para usá-lo e contribuir!

### Desenvolvido por Alchini e Fernando 🚀
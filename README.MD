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

A conexão com o banco pode ser feita através de um Terminal com os seguintes comandos:

```sh
psql -U postGress senhaBanco
\c bank_key
```

Crie as tabelas no banco de dados conforme no Documento init.sql na pasta database:

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE sessions (
  session_id UUID PRIMARY KEY,
  buttons JSON NOT NULL,
  combination_id VARCHAR(255),
  is_active BOOLEAN DEFAULT true
);

Configure os valores do banco conforme o arquivo .env na pasta backend:

```sh
PORT=3001
DB_USER=postgres
DB_HOST=localhost
DB_NAME=bank_key
DB_PASSWORD=senhaBanco
DB_PORT=portaBanco
```

### 4️⃣ Configuração do FrontEnd (React)

```sh
 cd ../frontend
 npm install   # Instala as dependências
 npm start     # Inicia a aplicação
```

### Resumo do Sistema Bank_Keyboard
O Bank_Keyboard é um sistema que simula a autenticação de de usuários através de uma senha. O projeto foi desenvolvido com foco em segurança, utilizando técnicas de criptografia para proteger as senhas e id de sessão. Abaixo, detalhamos as principais lógicas do sistema:

### 1️⃣ Lógica de Criptografia
A segurança dos dados é garantida por meio de técnicas de criptografia AES para as senhas:

Hash de Senhas:
As senhas dos usuários não são armazenadas em texto puro. Em vez disso, o sistema utiliza funções de hash para transformar a senha em um valor irreversível.

### 2️⃣ Funcionamento do Banco de Dados

Tabela de Usuários:
Armazena dados como ID, nome de usuário e hash da senha.

Tabela de Sessão:
Armazena dados como ID de sessão, Botões que aparecem em tela, Combinações dos botões em tela e Validação de sessão ativa

### 3️⃣ Fluxo de Operações

Autenticação:

O usuário insere suas credenciais (nome de usuário, e depois digita a senha no KeyBoard).

O sistema valida a senha comparando o hash armazenado com o hash da senha fornecida.

### 4️⃣ Interface Segura (Teclado Virtual)
O sistema incluii um teclado virtual para entrada de senha. Esse recurso adiciona uma camada extra de segurança:

Randomização de Teclas:
A disposição dos números no teclado virtual pode ser alterada dinamicamente, dificultando o uso de keyloggers.


### 🎯 Uso

Após iniciar o backend e o frontend, a aplicação estará disponível em http://localhost:3000.
O backend estará rodando em http://localhost:3001.


### Desenvolvido por Gustavo Alchini e Fernando 🚀

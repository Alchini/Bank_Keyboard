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

### Resumo do Sistema Bank_Keyboard
O Bank_Keyboard é um sistema que simula operações bancárias básicas, como autenticação de usuários, consulta de saldo, saques, depósitos e transferências. O projeto foi desenvolvido com foco em segurança, utilizando técnicas de criptografia para proteger dados sensíveis, como senhas e informações financeiras. Abaixo, detalhamos as principais lógicas do sistema:

### 1️⃣ Lógica de Criptografia
A segurança dos dados é garantida por meio de técnicas de criptografia, especialmente para proteger senhas e informações sensíveis:

Hash de Senhas:
As senhas dos usuários não são armazenadas em texto puro. Em vez disso, o sistema utiliza funções de hash (como SHA-256 ou bcrypt) para transformar a senha em um valor irreversível. Isso impede que, em caso de vazamento de dados, as senhas sejam facilmente recuperadas.

Criptografia de Dados:
Informações sensíveis, como saldos e transações, são criptografadas antes de serem armazenadas no banco de dados. O sistema pode utilizar algoritmos simétricos (ex: AES) para criptografar e descriptografar esses dados quando necessário.

Gerenciamento de Chaves:
As chaves de criptografia são armazenadas de forma segura, possivelmente em variáveis de ambiente ou em um gerenciador de segredos, para evitar exposição indevida.

### 2️⃣ Funcionamento do Banco de Dados
O banco de dados do sistema é estruturado para armazenar informações de usuários, contas e transações de forma organizada e segura:

Tabela de Usuários:
Armazena dados como ID, nome de usuário, hash da senha e outras informações de autenticação.

Tabela de Contas:
Relaciona cada conta a um usuário, com campos como número da conta, saldo (criptografado) e histórico de transações.

Tabela de Transações:
Registra todas as operações financeiras, como saques, depósitos e transferências. Cada transação inclui detalhes como valor, data/hora, IDs de origem e destino, e status da operação.

Consultas Seguras:
O sistema utiliza prepared statements ou ORMs para evitar vulnerabilidades como injeção de SQL. Além disso, as operações são realizadas dentro de transações para garantir atomicidade (ou seja, todas as etapas são concluídas com sucesso ou nenhuma é aplicada).

### 3️⃣ Fluxo de Operações
O sistema segue um fluxo bem definido para garantir a segurança e a integridade das operações:

Autenticação:

O usuário insere suas credenciais (nome de usuário e senha).

O sistema valida a senha comparando o hash armazenado com o hash da senha fornecida.

Após a autenticação, o usuário recebe um token de sessão (ex: JWT) para acessar outras funcionalidades.

Operações Bancárias:

Consulta de Saldo: O saldo é descriptografado e exibido ao usuário.

Saques/Depósitos: O saldo da conta é atualizado após a operação, e uma nova transação é registrada.

Transferências: O sistema valida o saldo da conta de origem, atualiza os saldos das contas envolvidas e registra a transação.

Auditoria e Logs:
Todas as operações são registradas em logs, com informações como ID do usuário, tipo de operação, valor e timestamp. Isso permite rastrear atividades e detectar possíveis irregularidades.

### 4️⃣ Interface Segura (Teclado Virtual)
O sistema pode incluir um teclado virtual para entrada de dados sensíveis, como senhas ou valores financeiros. Esse recurso adiciona uma camada extra de segurança:

Randomização de Teclas:
A disposição dos números no teclado virtual pode ser alterada dinamicamente, dificultando o uso de keyloggers.

Inputs Mascarados:
Durante a digitação de senhas ou valores, os caracteres são substituídos por asteriscos ou outros símbolos para evitar que sejam visualizados por terceiros.

Conclusão
O Bank_Keyboard é um sistema que combina funcionalidades bancárias básicas com técnicas avançadas de segurança, como criptografia de dados e autenticação segura. O repositório no GitHub demonstra a implementação dessas lógicas, priorizando a proteção de informações sensíveis e a usabilidade para o usuário final. Para mais detalhes, consulte o código-fonte e a documentação disponíveis no repositório.



### 🎯 Uso

Após iniciar o backend e o frontend, a aplicação estará disponível em http://localhost:3000 (por padrão).

### 📜 Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para usá-lo e contribuir!

### Desenvolvido por Alchini e Fernando 🚀
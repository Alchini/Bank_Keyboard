const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const crypto = require('crypto');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Função para gerar uma combinação única de botões
const combinationHistory = []; // Array para armazenar as últimas 100 combinações

const getUniqueCombination = async () => {
  let buttons;
  let combinationId;

  do {
    buttons = generateButtons();
    combinationId = buttons.map(b => b.num1.toString() + b.num2.toString()).join('');
  } while (combinationHistory.includes(combinationId)); // Verifica se a combinação já está no histórico

  // Adiciona a nova combinação ao histórico
  combinationHistory.push(combinationId);

  // Mantém o histórico com no máximo 100 combinações
  if (combinationHistory.length > 100) {
    combinationHistory.shift(); // Remove a combinação mais antiga
  }

  return { buttons, combinationId };
};

// Rota para obter uma nova sessão
router.get('/api/get-session', async (req, res) => {
  try {
    const sessionId = crypto.randomUUID(); // Gera um ID único para a sessão

    // Gera uma combinação única de botões
    const { buttons, combinationId } = await getUniqueCombination();

    // Salva a sessão no banco de dados
    await pool.query(
      'INSERT INTO sessions (session_id, buttons, combination_id, is_active) VALUES ($1, $2, $3, $4)',
      [sessionId, JSON.stringify(buttons), combinationId, true]
    );

    console.log('Botões gerados:', buttons); // Log dos botões gerados
    res.json({ sessionId, buttons }); // Retorna os botões para o frontend
  } catch (error) {
    console.error('Erro ao gerar sessão:', error); // Log de erro detalhado
    res.status(500).json({ message: 'Erro ao gerar sessão' });
  }
});

// Rota para validar a sequência de cliques
router.post('/api/validate-sequence', async (req, res) => {
  const { buttonPairs, userId } = req.body;

  try {
    // Busca a senha do usuário no banco de dados
    const user = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [userId]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    const expectedPassword = user.rows[0].password; // Senha esperada (string)
    const expectedPasswordArray = Array.from(expectedPassword).map(Number); // Converte a senha em um array de números

    // Gera todas as combinações possíveis
    const combinations = generateCombinations(buttonPairs);

    // Verifica se alguma combinação corresponde à senha esperada
    const isValid = combinations.some(combination =>
      JSON.stringify(combination) === JSON.stringify(expectedPasswordArray)
    );

    console.log('Button pairs:', buttonPairs);
    console.log('Expected password array:', expectedPasswordArray);
    console.log('Generated combinations:', combinations);
    console.log('Is valid:', isValid);

    if (isValid) {
      res.json({ message: 'Senha correta!' });
    } else {
      res.status(401).json({ message: 'Senha incorreta!' }); // Retorna erro 401 para senha incorreta
    }
  } catch (error) {
    console.error('Erro ao validar sequência:', error);
    res.status(500).json({ message: 'Erro ao validar sequência' });
  }
});

function generateCombinations(buttonPairs) {
  if (buttonPairs.length === 0) return [[]];

  const firstPair = buttonPairs[0];
  const restCombinations = generateCombinations(buttonPairs.slice(1));

  const combinations = [];
  for (const num of firstPair) {
    for (const combination of restCombinations) {
      combinations.push([num, ...combination]);
    }
  }

  return combinations;
}

// Função para gerar os pares de números
function generateButtons() {
  const buttons = [];
  for (let i = 0; i < 6; i++) {
    const num1 = Math.floor(Math.random() * 10); // Primeiro número do par
    const num2 = Math.floor(Math.random() * 10); // Segundo número do par
    buttons.push({ id: i + 1, value: `${num1} ou ${num2}`, num1, num2 });
  }
  return buttons;
}

// Função para validar a sequência de cliques
function validateSequence(sequence, expectedPassword) {
  // Verifica se a sequência fornecida é igual à senha esperada
  if (sequence.length !== expectedPassword.length) {
    return false;
  }

  for (let i = 0; i < sequence.length; i++) {
    if (sequence[i] !== parseInt(expectedPassword[i])) { // Converte a senha esperada para número
      return false;
    }
  }

  return true;
}

module.exports = router;
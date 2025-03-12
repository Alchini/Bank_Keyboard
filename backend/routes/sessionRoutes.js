const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const crypto = require('crypto');
const { decrypt } = require('./cryptoUtils');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


const getUniqueCombination = async () => {
  let buttons;
  let combinationId;
  let existingCombination;

  do {
    buttons = generateButtons();
    combinationId = buttons.map(b => b.num1.toString() + b.num2.toString()).join('');
    existingCombination = await pool.query(
      'SELECT * FROM sessions WHERE combination_id = $1',
      [combinationId]
    );
  } while (existingCombination.rows.length > 0);

  return { buttons, combinationId };
};

router.post('/validate-sequence', async (req, res) => {
  const { buttonPairs, userId } = req.body;

  try {
    const user = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [userId]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    const decryptedPassword = decrypt({
      iv: user.rows[0].iv,
      encryptedData: user.rows[0].password,
    });

    const expectedPasswordArray = Array.from(decryptedPassword).map(Number);
    const combinations = generateCombinations(buttonPairs);

    const isValid = combinations.some(combination =>
      JSON.stringify(combination) === JSON.stringify(expectedPasswordArray)
    );

    if (isValid) {
      res.json({ message: 'Senha correta!' });
    } else {
      res.status(401).json({ message: 'Senha incorreta!' });
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

function generateButtons() {
  const buttons = [];
  for (let i = 0; i < 6; i++) {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    buttons.push({ id: i + 1, value: `${num1} ou ${num2}`, num1, num2 });
  }
  return buttons;
}

router.get('/get-session', async (req, res) => {
  try {
    const sessionId = crypto.randomUUID();

    const { buttons, combinationId } = await getUniqueCombination();

    await pool.query(
      'INSERT INTO sessions (session_id, buttons, combination_id, is_active) VALUES ($1, $2, $3, $4)',
      [sessionId, JSON.stringify(buttons), combinationId, true]
    );

    console.log('Botões gerados:', buttons);
    res.json({ sessionId, buttons });
  } catch (error) {
    console.error('Erro ao gerar sessão:', error);
    res.status(500).json({ message: 'Erro ao gerar sessão' });
  }
});

module.exports = router;
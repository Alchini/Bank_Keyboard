const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const { encrypt } = require('./cryptoUtils');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExists = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Nome de usuário já existe' });
    }

    const encryptedPassword = encrypt(password);

    await pool.query(
      'INSERT INTO users (username, password, iv) VALUES ($1, $2, $3)',
      [username, encryptedPassword.encryptedData, encryptedPassword.iv]
    );

    res.json({ message: 'Cadastro realizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ message: 'Erro ao cadastrar usuário' });
  }
});

router.post('/login', async (req, res) => {
  const { username } = req.body;

  try {
    const user = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    res.json({ userId: user.rows[0].id });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
});

module.exports = router;
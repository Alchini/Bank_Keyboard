const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Rota para cadastro
router.post('/api/register', async (req, res) => {
  console.log('Dados recebidos:', req.body); // Log 1

  const { username, password } = req.body;

  try {
    console.log('Verificando se o usuário já existe...'); // Log 2
    const userExists = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (userExists.rows.length > 0) {
      console.log('Nome de usuário já existe:', username); // Log 3
      return res.status(400).json({ message: 'Nome de usuário já existe' });
    }

    console.log('Inserindo novo usuário no banco de dados...'); // Log 4
    await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2)',
      [username, password]
    );

    console.log('Cadastro realizado com sucesso!'); // Log 5
    res.json({ message: 'Cadastro realizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error); // Log 6
    res.status(500).json({ message: 'Erro ao cadastrar usuário' });
  }
});

// Rota para login
router.post('/api/login', async (req, res) => {
  const { username } = req.body;

  try {
    // Busca o usuário no banco de dados
    const user = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    res.json({ userId: user.rows[0].id }); // Retorna o ID do usuário
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
});

module.exports = router;
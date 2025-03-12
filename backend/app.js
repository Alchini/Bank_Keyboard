const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const sessionRoutes = require('./routes/sessionRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const userRoutes = require('./routes/userRoutes');
app.use(userRoutes);

app.use((req, res, next) => {
  console.log(`Recebendo requisição: ${req.method} ${req.url}`);
  next();
});

// Usa as rotas de sessão
app.use(sessionRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
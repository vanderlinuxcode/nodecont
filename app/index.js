import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import Mensagem from './Mensagem.js';

const app = express();
const PORT = 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientPath = path.join(__dirname, '../client/dist');

// Conexão com MongoDB Atlas (já configurado)
mongoose.connect('sua_string_de_conexao', {
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado ao MongoDB Atlas');
}).catch(err => {
  console.error('Erro ao conectar ao MongoDB:', err);
});

app.use(express.static(clientPath));
app.use(express.json());

//Salva os dados recebidos no MongoDB
app.post('/api/form', async (req, res) => {
  const { nome, email, mensagem } = req.body;

  try {
    const novaMensagem = new Mensagem({ nome, email, mensagem });
    await novaMensagem.save();
    res.json({ success: true, nome });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Erro ao salvar no banco' });
  }
});

// Frontend fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

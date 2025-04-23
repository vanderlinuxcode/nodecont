import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import Mensagem from './Mensagem.js';
// import app from './style.css';

const app = express();
const PORT = 3000;

// Middleware para limpar cache
app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});

// Configurações do Express
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientPath = path.join(__dirname, '../client/dist');

// Conexão com MongoDB Atlas (já configurado)
mongoose.connect('mongodb+srv://centronictecnologia:SaKA9UYBNu8U1YTg@cluster01.sayjfqg.mongodb.net/formulario1?retryWrites=true&w=majority&appName=Cluster01', {
}).then(() => {
  console.log('Conectado ao MongoDB Atlas');
}).catch(err => {
  console.error('Erro ao conectar ao MongoDB:', err);
});

app.use(express.static(clientPath));
app.use(express.json());

//Salva os dados recebidos no MongoDB
app.post('/api/form', async (req, res) => {
  const { nome, email, telefone, mensagem } = req.body;

  try {
    const novaMensagem = new Mensagem({ nome, email, telefone, mensagem });
    await novaMensagem.save();
    res.json({ success: true, nome, email, telefone, mensagem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Erro ao salvar no banco' });
  }
});

// Rota GET limpa os campos
app.get('/', (req, res) => {
  res.render('form', {
    error: null,
    valores: null
  });
});

// Frontend fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

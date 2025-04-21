// app/Mensagem.js
import mongoose from 'mongoose';

const MensagemSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mensagem: {
    type: String,
    required: true,
  },
  data: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Mensagem', MensagemSchema);

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
  telefone: {
    type: String,
    required: true,
  },
  mensagem: {
    type: String,
    required: true,
  },
   data: {
    type: String,
    default: () => {
      return new Date().toLocaleString('pt-BR',{
        timeZone: 'America/Sao_Paulo'
      })
    }
  }
  });

// Criação do modelo
export default mongoose.model('Mensagem', MensagemSchema);
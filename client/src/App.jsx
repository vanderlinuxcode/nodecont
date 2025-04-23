import { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({ 
  nome: '', 
  email: '',
  telefone: '',
  mensagem: ''
});

  const [resposta, setResposta] = useState(null);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('/api/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    setResposta(data);
    //Limpa após o envio
    setFormData({ nome: '', email: '', telefone: '', mensagem: '' });
  };

  //Função para resetar o estado e voltar ao formulário
  const handleVoltar = () => {
    setResposta(null);
    // Opcional: limpa os campos ao voltar
    setFormData({ nome: '', email: '', telefone: '', mensagem: '' }); 
  };

  return (
    <div className="container">
      <h1>Dados Básicos</h1>
      <form onSubmit={handleSubmit}>
        <input name="nome" placeholder="seu nome completo" onChange={handleChange} required />
        <input name="email" type="email" placeholder="email@email" onChange={handleChange} required />
        <input name="telefone" placeholder="número com DDD" onChange={handleChange} required />
        <textarea name="mensagem" placeholder="escreva uma mensagem simples" onChange={handleChange} required />
        <button type="submit">Enviar</button>
      </form>
      {resposta && (
        <div className="resposta">
          <h2>Obrigado, {resposta.nome}</h2>
          <p>Email: {resposta.email}</p>
          <p>Telefone: {resposta.telefone}</p>
          <p>Mensagem: {resposta.mensagem}</p>
          <button onClick={handleVoltar}>Voltar</button>
        </div>
      )}
    </div>
  );
}
export default App;

import { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({ nome: '', email: '', mensagem: '' });
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
  };

  return (
    <div className="container">
      <h1>Formulário1</h1>
      <form onSubmit={handleSubmit}>
        <input name="nome" placeholder="Nome" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <textarea name="mensagem" placeholder="Mensagem" onChange={handleChange} required />
        <button type="submit">Enviar</button>
      </form>
      {resposta && (
        <div className="resposta">
          <h2>Obrigado, {resposta.nome}</h2>
          <p>Email Fornecido: {resposta.email}</p>
          <p>Mensagem informada: {resposta.mensagem}</p>
        </div>
      )}
    </div>
  );
}
export default App;

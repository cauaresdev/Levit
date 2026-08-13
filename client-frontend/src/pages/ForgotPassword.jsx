import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import AuthLayout from './AuthLayout';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Por favor, informe seu e-mail.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setMessage('');
      const res = await api.post('/auth/forgot-password', { email });
      setMessage(res.data.message || 'Se o e-mail existir em nossa base, um link de recuperação foi enviado.');
    } catch (err) {
      setError(err.response?.data?.message || 'Ocorreu um erro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-xl font-bold text-gray-900 mt-2">Redefinir Senha</h2>
      <p className="text-sm text-light-text mb-6 text-center mt-1">Será enviado um e-mail com link de redefinição</p>

      {message && <div className="mb-4 text-sm text-green-700 bg-green-100 p-2 rounded">{message}</div>}
      {error && <div className="mb-4 text-sm text-red-700 bg-red-100 p-2 rounded">{error}</div>}

      <form className="w-full space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">E-Mail</label>
          <input 
            type="email" 
            placeholder="godofredo@empresa.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-primary text-white py-2.5 rounded-lg hover:bg-primary/80 transition duration-200 text-sm font-medium mt-2 disabled:opacity-50"
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>

        <div className="text-center mt-4">
          <Link to="/login" className="text-sm text-primary hover:underline">
            Voltar para o Login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
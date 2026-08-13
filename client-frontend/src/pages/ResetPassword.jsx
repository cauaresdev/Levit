import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import AuthLayout from './AuthLayout';

export default function ResetPassword() {
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenParam = params.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      setError('Token de recuperação não fornecido na URL.');
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError('Token inválido.');
      return;
    }
    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setMessage('');
      const res = await api.post('/auth/reset-password', { token, senha });
      setMessage(res.data.message || 'Senha redefinida com sucesso.');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      let errorMsg = err.response?.data?.message || 'Ocorreu um erro. Tente novamente.';
      if (err.response?.data?.errors?.senha) {
        errorMsg = err.response.data.errors.senha;
      }
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-xl font-bold text-gray-900 mt-2">Redefinir Senha</h2>
      <p className="text-sm text-light-text mb-6 text-center mt-1">Recuperar conta</p>

      {message && <div className="mb-4 text-sm text-green-700 bg-green-100 p-2 rounded">{message}</div>}
      {error && <div className="mb-4 text-sm text-red-700 bg-red-100 p-2 rounded">{error}</div>}

      <form className="w-full space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Nova Palavra-passe</label>
          <input 
            type="password" 
            placeholder="Crie sua nova Palavra-passe" 
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm mb-2"
          />
          {/* Indicador de força da senha - Simplificado para este MVP */}
          <div className="flex gap-1 h-1.5 mb-1">
            <div className={`flex-1 rounded-full ${senha.length > 3 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
            <div className={`flex-1 rounded-full ${senha.length > 5 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
            <div className={`flex-1 rounded-full ${senha.length > 7 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
            <div className={`flex-1 rounded-full ${/[A-Za-z]/.test(senha) && /\d/.test(senha) ? 'bg-green-600' : 'bg-gray-200'}`}></div>
          </div>
          <p className="text-[10px] text-green-700">Palavra-passe forte (min. 8 caracteres, letras e números)</p>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Confirmar palavra-passe</label>
          <input 
            type="password" 
            placeholder="Repita a palavra-passe" 
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading || !token}
          className="w-full bg-primary text-white py-2.5 rounded-lg hover:bg-primary/80 transition duration-200 text-sm font-medium mt-4 disabled:opacity-50"
        >
          {loading ? 'Redefinindo...' : 'Redefinir Senha'}
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
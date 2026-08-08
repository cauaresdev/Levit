import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from './AuthLayout';

export default function Login() {
  const navigate = useNavigate();
  const { login, autenticado } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  // Redirect if already authenticated
  if (autenticado) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      await login(email, senha);
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Erro ao fazer login. Tente novamente.';
      setErro(msg);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-xl font-bold text-gray-900 mt-2">Bem-vindo de volta</h2>
      <p className="text-sm text-light-text mb-6 text-center mt-1">Acesse à sua conta para gerir os seus módulos</p>

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        {erro && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-xs">
            {erro}
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">E-mail corporativo</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="exemplo@empresa.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent text-sm"
            required
          />
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Palavra-passe</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="********"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent text-sm"
            required
          />
        </div>

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">Esqueceu da palavra-passe?</Link>
        </div>

        <button
          type="submit"
          disabled={carregando}
          className="w-full bg-primary text-white py-2.5 rounded-lg hover:bg-primary/80 transition duration-200 text-sm font-medium flex justify-center items-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {carregando ? 'Entrando...' : <>Entrar no sistema &rarr;</>}
        </button>
      </form>

      <p className="mt-6 text-xs text-gray-600">
        Não tem conta? <Link to="/register" className="text-indigo-600 font-medium hover:underline">Registre-se grátis</Link>
      </p>
    </AuthLayout>
  );
}
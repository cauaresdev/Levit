import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';

export default function Login() {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <h2 className="text-xl font-bold text-gray-900 mt-2">Bem-vindo de volta</h2>
      <p className="text-sm text-light-text mb-6 text-center mt-1">Acesse à sua conta para gerir os seus módulos</p>

      <form className="w-full space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">E-mail corporativo</label>
          <input 
            type="email" 
            placeholder="exemplo@empresa.com" 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent text-sm"
          />
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Senha</label>
          <input 
            type="password" 
            placeholder="********" 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent text-sm"
          />
        </div>

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">Esqueceu sua senha?</Link>
        </div>

        <button 
          type="button"  
          onClick={() => navigate('/dashboard')}
          className="w-full bg-primary text-white py-2.5 rounded-lg hover:bg-primary/80 transition duration-200 text-sm font-medium flex justify-center items-center gap-2 mt-2"
        >
          Entrar no sistema &rarr;
        </button>
      </form>

      <p className="mt-6 text-xs text-gray-600">
        Não tem conta? <Link to="/register" className="text-indigo-600 font-medium hover:underline">Registre-se grátis</Link>
      </p>
    </AuthLayout>
  );
}
import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';

export default function Register() {
  return (
    <AuthLayout bgImage="/background 3.png">
      <h2 className="text-xl font-bold text-gray-900 mt-2">Criar a sua conta</h2>
      <p className="text-sm text-light-text mb-6 text-center mt-1">Comece a organizar a sua empresa hoje.</p>

      <form className="w-full space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Nome completo</label>
          <input 
            type="text" 
            placeholder="Camila Moraes" 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">E-mail corporativo</label>
          <input 
            type="email" 
            placeholder="camila@empresa.com" 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">CPF ou CNPJ</label>
          <input 
            type="text" 
            placeholder="XXX.XXX.XXX-XX | XX.XXX.XXX/XXXX-XX" 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
          />
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Senha</label>
          <input 
            type="password" 
            placeholder="Crie uma senha forte" 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm mb-2"
          />
          {/* Indicador de força da senha */}
          <div className="flex gap-1 h-1.5 mb-1">
            <div className="flex-1 bg-green-600 rounded-full"></div>
            <div className="flex-1 bg-green-600 rounded-full"></div>
            <div className="flex-1 bg-green-600 rounded-full"></div>
            <div className="flex-1 bg-green-600 rounded-full"></div>
          </div>
          <p className="text-[10px] text-green-700">Senha forte</p>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Confirmar Senha</label>
          <input 
            type="password" 
            placeholder="Repita a senha" 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
          />
        </div>

        <button 
          type="button" 
          className="w-full bg-primary text-white py-2.5 rounded-lg hover:bg-primary/80 transition duration-200 text-sm font-medium mt-4"
        >
          Criar conta gratuita
        </button>
      </form>

      <p className="mt-6 text-xs text-gray-600">
        Já tem conta? <Link to="/login" className="text-indigo-600 font-medium hover:underline">Faça login</Link>
      </p>
    </AuthLayout>
  );
}
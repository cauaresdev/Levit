import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';

export default function ResetPassword() {
  return (
    <AuthLayout backgroundImage="/background 2.png">
      <h2 className="text-xl font-bold text-text-dark mt-2">Redefinir Senha</h2>
      <p className="text-sm text-text-light mb-6 text-center mt-1">Recuperar conta</p>

      <form className="w-full space-y-4">
        <div>
          <label className="block text-xs font-medium text-text-dark mb-1">Nova Palavra-passe</label>
          <input
            type="password"
            placeholder="Crie sua nova Palavra-passe"
            className="w-full px-3 py-2 border border-divider rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm mb-2"
          />
          {/* Indicador de força da senha */}
          <div className="flex gap-1 h-1.5 mb-1">
            <div className="flex-1 bg-green-600 rounded-full"></div>
            <div className="flex-1 bg-green-600 rounded-full"></div>
            <div className="flex-1 bg-green-600 rounded-full"></div>
            <div className="flex-1 bg-green-600 rounded-full"></div>
          </div>
          <p className="text-[10px] text-green-700">Palavra-passe forte</p>
        </div>

        <div>
          <label className="block text-xs font-medium text-text-dark mb-1">Confirmar palavra-passe</label>
          <input
            type="password"
            placeholder="Repita a palavra-passe"
            className="w-full px-3 py-2 border border-divider rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>

        <button
          type="button"
          className="w-full bg-primary text-white py-2.5 rounded-lg hover:bg-primary/90 transition duration-200 text-sm font-medium mt-4 cursor-pointer"
        >
          Redefinir Senha
        </button>
      </form>

      <p className="mt-6 text-xs text-text-light">
        <Link to="/login" className="text-primary font-medium hover:underline">
          Voltar ao login
        </Link>
      </p>
    </AuthLayout>
  );
}

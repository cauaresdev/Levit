import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';

export default function ForgotPassword() {
  return (
    <AuthLayout backgroundImage="/background 2.png">
      <h2 className="text-xl font-bold text-text-dark mt-2">Redefinir Senha</h2>
      <p className="text-sm text-text-light mb-6 text-center mt-1">Será enviado um e-mail com link de redefinição</p>

      <form className="w-full space-y-4">
        <div>
          <label className="block text-xs font-medium text-text-dark mb-1">E-Mail</label>
          <input
            type="email"
            placeholder="godofredo@empresa.com"
            className="w-full px-3 py-2 border border-divider rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>

        <button
          type="button"
          className="w-full bg-primary text-white py-2.5 rounded-lg hover:bg-primary/90 transition duration-200 text-sm font-medium mt-2 cursor-pointer"
        >
          Enviar
        </button>
      </form>

      <p className="mt-6 text-xs text-text-light">
        Lembrou a senha?{' '}
        <Link to="/login" className="text-primary font-medium hover:underline">
          Voltar ao login
        </Link>
      </p>
    </AuthLayout>
  );
}

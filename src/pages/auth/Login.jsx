import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';

export default function Login() {
  return (
    <AuthLayout backgroundImage="/background 2.png">
      <h2 className="text-xl font-bold text-text-dark mt-2">Bem-vindo de volta</h2>
      <p className="text-sm text-text-light mb-6 text-center mt-1">Acesse à sua conta para gerir os seus módulos</p>

      <form className="w-full space-y-4">
        <div>
          <label className="block text-xs font-medium text-text-dark mb-1">E-mail corporativo</label>
          <input
            type="email"
            placeholder="exemplo@empresa.com"
            className="w-full px-3 py-2 border border-divider rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-text-dark mb-1">Palavra-passe</label>
          <input
            type="password"
            placeholder="********"
            className="w-full px-3 py-2 border border-divider rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
        </div>

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-xs text-primary hover:text-primary/80 font-medium">
            Esqueceu da palavra-passe?
          </Link>
        </div>

        <button
          type="button"
          className="w-full bg-primary text-white py-2.5 rounded-lg hover:bg-primary/90 transition duration-200 text-sm font-medium flex justify-center items-center gap-2 mt-2 cursor-pointer"
        >
          Entrar na plataforma &rarr;
        </button>
      </form>

      <p className="mt-6 text-xs text-text-light">
        Não tem conta?{' '}
        <Link to="/register" className="text-primary font-medium hover:underline">
          Registre-se grátis
        </Link>
      </p>
    </AuthLayout>
  );
}

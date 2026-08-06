import AuthLayout from './AuthLayout';

export default function ForgotPassword() {
  return (
    <AuthLayout>
      <h2 className="text-xl font-bold text-gray-900 mt-2">Redefinir Senha</h2>
      <p className="text-sm text-light-text mb-6 text-center mt-1">Será enviado um e-mail com link de redefinição</p>

      <form className="w-full space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">E-Mail</label>
          <input 
            type="email" 
            placeholder="godofredo@empresa.com" 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
          />
        </div>

        <button 
          type="button" 
          className="w-full bg-primary text-white py-2.5 rounded-lg hover:bg-primary/80 transition duration-200 text-sm font-medium mt-2"
        >
          Enviar
        </button>
      </form>
    </AuthLayout>
  );
}
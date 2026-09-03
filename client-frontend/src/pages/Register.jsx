import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from './AuthLayout';

function calcularForcaSenha(senha) {
  let forca = 0;
  if (senha.length >= 8) forca++;
  if (/[A-Z]/.test(senha)) forca++;
  if (/[0-9]/.test(senha)) forca++;
  if (/[^A-Za-z0-9]/.test(senha)) forca++;
  return forca; // 0-4
}

const FORCA_LABELS = ['', 'Fraca', 'Razoável', 'Boa', 'Forte'];
const FORCA_COLORS = ['bg-gray-200', 'bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-600'];
const FORCA_TEXT_COLORS = ['text-gray-400', 'text-red-600', 'text-yellow-600', 'text-blue-600', 'text-green-700'];

export default function Register() {
  const navigate = useNavigate();
  const { registrar, autenticado } = useAuth();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cnpjCpf, setCnpjCpf] = useState('');
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  if (autenticado) {
    return <Navigate to="/dashboard" replace />;
  }

  const forcaSenha = calcularForcaSenha(senha);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    if (senha.length < 8) {
      setErro('A senha deve ter no mínimo 8 caracteres.');
      return;
    }

    setCarregando(true);

    try {
      await registrar({
        nome,
        email,
        senha,
        cnpj_cpf: cnpjCpf,
        nome_empresa: nomeEmpresa || nome,
      });
      navigate('/dashboard');
    } catch (err) {
      const data = err.response?.data;
      if (data?.errors) {
        const msgs = Object.values(data.errors).flat();
        setErro(msgs.join(' '));
      } else {
        setErro(data?.message || 'Erro ao registrar. Tente novamente.');
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <AuthLayout bgImage="/Criar conta.png">
      <h2 className="text-xl font-bold text-gray-900 mt-2">Criar a sua conta</h2>
      <p className="text-sm text-light-text mb-6 text-center mt-1">Comece a organizar a sua empresa hoje.</p>

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        {erro && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-xs">
            {erro}
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Nome completo</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Camila Moraes"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">E-mail corporativo</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="camila@empresa.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">CPF ou CNPJ</label>
          <input
            type="text"
            value={cnpjCpf}
            onChange={(e) => setCnpjCpf(e.target.value)}
            placeholder="XXX.XXX.XXX-XX | XX.XXX.XXX/XXXX-XX"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Nome da empresa</label>
          <input
            type="text"
            value={nomeEmpresa}
            onChange={(e) => setNomeEmpresa(e.target.value)}
            placeholder="Empresa XYZ Ltda"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
            required
          />
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Palavra-passe</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Crie uma palavra-passe forte"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm mb-2"
            required
          />
          {/* Indicador de força da senha dinâmico */}
          <div className="flex gap-1 h-1.5 mb-1">
            {[1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`flex-1 rounded-full transition-colors duration-300 ${
                  senha.length > 0 && forcaSenha >= level
                    ? FORCA_COLORS[forcaSenha]
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          {senha.length > 0 && (
            <p className={`text-[10px] ${FORCA_TEXT_COLORS[forcaSenha]}`}>
              {FORCA_LABELS[forcaSenha] || 'Muito fraca'}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Confirmar palavra-passe</label>
          <input
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            placeholder="Repita a palavra-passe"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
            required
          />
        </div>

        <button
          type="submit"
          disabled={carregando}
          className="w-full bg-primary text-white py-2.5 rounded-lg hover:bg-primary/80 transition duration-200 text-sm font-medium mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {carregando ? 'Criando conta...' : 'Criar conta gratuita'}
        </button>
      </form>

      <p className="mt-6 text-xs text-gray-600">
        Já tem conta? <Link to="/login" className="text-indigo-600 font-medium hover:underline">Faça login</Link>
      </p>
    </AuthLayout>
  );
}
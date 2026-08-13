import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import { moduloService } from '../services/moduloService';

export default function Dashboard() {
  const { primeiroNome, iniciais, empresa } = useAuth();
  const [modulos, setModulos] = useState([]);
  const [loadingModulos, setLoadingModulos] = useState(true);

  useEffect(() => {
    fetchModulos();
  }, []);

  const fetchModulos = async () => {
    try {
      setLoadingModulos(true);
      const data = await moduloService.getAll();
      setModulos(data);
    } catch (error) {
      console.error('Erro ao carregar módulos:', error);
    } finally {
      setLoadingModulos(false);
    }
  };

  // Calculate KPIs from real data
  const totalModulos = modulos.length;
  const totalRegistros = modulos.reduce((acc, m) => acc + (parseInt(m.total_registros) || 0), 0);

  const kpis = [
    { value: totalModulos, label: 'Módulos Ativos', colorClass: 'text-primary' },
    { value: totalRegistros, label: 'Total de Registros', colorClass: 'text-emerald-600' },
  ];

  // Show up to 6 recent modules
  const recentModules = modulos.slice(0, 6);

  return (
    <Layout>
      {/* CABEÇALHO */}
      <header className="flex justify-between items-end mb-8 shrink-0">
        <div>
          <h1 className="text-2xl font-bold">
            Olá, {primeiroNome}!
          </h1>
          <p className="text-sm text-light-text mt-1">
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
          {iniciais}
        </div>
      </header>

      {/* KPIS (INDICADORES) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 shrink-0">
        {loadingModulos ? (
          [1, 2].map((skeleton) => (
            <div key={skeleton} className="bg-white border border-divider rounded-xl p-6 h-28 animate-pulse flex flex-col justify-center">
              <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
              <div className="h-4 bg-gray-100 rounded w-24"></div>
            </div>
          ))
        ) : (
          kpis.map((kpi, index) => (
            <div key={index} className="bg-white border border-divider rounded-xl p-6">
              <h3 className={`text-3xl font-bold mb-1 ${kpi.colorClass}`}>{kpi.value}</h3>
              <p className="text-sm text-light-text">{kpi.label}</p>
            </div>
          ))
        )}
      </section>

      {/* MÓDULOS */}
      <section className="mb-8 shrink-0">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Módulos</h2>
          <Link 
            to="/modulos/novo"
            className="bg-primary text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary/80 transition flex items-center gap-1.5"
          >
            <span className="material-icons text-base">add</span>
            Novo Módulo
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loadingModulos ? (
             [1, 2, 3].map((skeleton) => (
              <div key={skeleton} className="bg-white border border-divider rounded-xl p-4 flex items-center gap-4 animate-pulse">
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
                  <div className="h-3 bg-gray-100 rounded w-16"></div>
                </div>
              </div>
            ))
          ) : recentModules.length === 0 ? (
            <div className="col-span-full bg-white border border-divider rounded-xl p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-background flex items-center justify-center mx-auto mb-3">
                <span className="material-icons text-2xl text-light-text">widgets</span>
              </div>
              <p className="text-light-text mb-3 text-sm">Nenhum módulo criado ainda.</p>
              <Link to="/modulos/novo" className="text-primary font-medium hover:underline text-sm">
                Crie seu primeiro módulo
              </Link>
            </div>
          ) : (
            recentModules.map((modulo) => (
              <Link
                key={modulo.id} 
                to={`/modulos/${modulo.id}/registros`}
                className="bg-white border border-divider rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:shadow-md hover:border-primary/20 transition group"
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white bg-primary shrink-0">
                  <span className="material-icons text-xl">{modulo.icone || 'extension'}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm truncate">{modulo.nome}</h4>
                  <p className="text-xs text-light-text">
                    {modulo.total_registros || 0} registro{(modulo.total_registros || 0) != 1 ? 's' : ''}
                  </p>
                </div>
                <span className="material-icons text-lg text-light-text opacity-0 group-hover:opacity-100 transition-opacity">
                  arrow_forward
                </span>
              </Link>
            ))
          )}
        </div>

        {modulos.length > 6 && (
          <div className="text-center mt-4">
            <Link to="/modulos" className="text-sm text-primary font-medium hover:underline">
              Ver todos os {modulos.length} módulos
            </Link>
          </div>
        )}
      </section>
    </Layout>
  );
}

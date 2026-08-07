import { Link } from 'react-router-dom';

export default function Dashboard() {
  // Variáveis simulando o estado inicial vazio (aguardando o back-end)
  const user = null; // Dados do usuário logado
  const kpis = []; // Array de métricas superiores
  const recentModules = []; // Array de módulos recentes
  const kanbanStages = []; // Array com as colunas do funil (Triagem, Entrevista, etc.)
  const teamMembers = []; // Array com os membros da equipe

  return (
    <div className="min-h-screen flex bg-background font-sans text-gray-900">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-divider flex flex-col justify-between">
        <div>
          {/* Logo */}
          <div className="h-20 flex items-center px-6 border-b border-divider">
            <div className="flex items-center gap-3">
              <img src="/Logo.png" alt="Logo" className="h-8" />
              <span className="font-bold text-xl">Levit</span>
            </div>
            <button className="ml-auto text-light-text hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>

          {/* Navegação */}
          <nav className="mt-6 flex flex-col gap-1">
            <Link to="/dashboard" className="flex items-center px-6 py-3 bg-background border-l-4 border-primary text-black font-semibold text-sm">Dashboard</Link>
            <a href="#" className="flex items-center px-6 py-3 border-l-4 border-transparent text-light-text hover:bg-background hover:text-gray-600 text-sm">Módulos</a>
            <hr className="my-2 border-divider w-4/5 mx-auto" />
            <a href="#" className="flex items-center px-6 py-3 border-l-4 border-transparent text-light-text hover:bg-background hover:text-gray-600 text-sm">Equipe</a>
            <a href="#" className="flex items-center px-6 py-3 border-l-4 border-transparent text-light-text hover:bg-background hover:text-gray-600 text-sm">Configurações</a>
            <a href="#" className="flex items-center px-6 py-3 border-l-4 border-transparent text-light-text hover:bg-background hover:text-gray-600 text-sm">Automações</a>
          </nav>
        </div>

        {/* Perfil do Usuário Logado (Bottom) */}
        <div className="p-6 border-t border-divider flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
            {/* BACK-END: Iniciais do usuário */}
            {user ? user.initials : '...'}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">{user ? user.name : 'Carregando...'}</p>
          </div>
          <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">
            {/* BACK-END: Regra de acesso (Admin, etc) */}
            {user ? user.role : '...'}
          </span>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* CABEÇALHO */}
        <header className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-2xl font-bold">
              Olá, {user ? user.firstName : 'Usuário'}!
            </h1>
            <p className="text-sm text-light-text mt-1">
              {/* BACK-END: Injetar data dinâmica formatada */}
              {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
            {user ? user.initials : '...'}
          </div>
        </header>

        {/* KPIS (INDICADORES) */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {kpis.length === 0 ? (
            // Layout fantasma enquanto aguarda os dados
            [1, 2, 3, 4].map((skeleton) => (
              <div key={skeleton} className="bg-white border border-divider rounded-xl p-6 h-28 animate-pulse flex flex-col justify-center">
                <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-4 bg-gray-100 rounded w-24"></div>
              </div>
            ))
          ) : (
            // BACK-END: Mapear os indicadores reais aqui
            kpis.map((kpi, index) => (
              <div key={index} className="bg-white border border-divider rounded-xl p-6">
                <h3 className={`text-3xl font-bold mb-1 ${kpi.colorClass}`}>{kpi.value}</h3>
                <p className="text-sm text-light-text">{kpi.label}</p>
              </div>
            ))
          )}
        </section>

        {/* MÓDULOS RECENTES */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Módulos acessados recentemente</h2>
            <button className="bg-primary text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary/80 transition">
              + Adicionar Módulo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentModules.length === 0 ? (
               // Layout fantasma
               [1, 2, 3, 4, 5, 6].map((skeleton) => (
                <div key={skeleton} className="bg-white border border-divider rounded-xl p-4 flex items-center gap-4 animate-pulse">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
                    <div className="h-3 bg-gray-100 rounded w-16"></div>
                  </div>
                </div>
              ))
            ) : (
              // BACK-END: Mapear os módulos reais
              recentModules.map((module) => (
                <div key={module.id} className="bg-white border border-divider rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${module.bgColor}`}>
                    {/* Imagem/Ícone dinâmico */}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{module.name}</h4>
                    <p className="text-xs text-light-text">{module.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* GRID INFERIOR (KANBAN E EQUIPE) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* FUNIL (KANBAN) */}
          <section className="lg:col-span-2 bg-white border border-divider rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold text-md">Recrutamento: Vaga Designer UI/UX</h2>
              <a href="#" className="text-sm text-primary hover:underline font-medium">Ver Funil</a>
            </div>

            <div className="grid grid-cols-3 gap-4 h-64">
               {kanbanStages.length === 0 ? (
                  // Divs estruturais vazias prontas para injeção
                  <>
                    <div className="bg-background rounded-lg p-3">
                      <h3 className="text-xs font-semibold text-light-text mb-3">TRIAGEM (0)</h3>
                      {/* Espaço para os cards de candidatos */}
                    </div>
                    <div className="bg-background rounded-lg p-3">
                      <h3 className="text-xs font-semibold text-light-text mb-3">ENTREVISTA (0)</h3>
                      {/* Espaço para os cards de candidatos */}
                    </div>
                    <div className="bg-background rounded-lg p-3">
                      <h3 className="text-xs font-semibold text-light-text mb-3">TESTE TÉCNICO (0)</h3>
                      {/* Espaço para os cards de candidatos */}
                    </div>
                  </>
               ) : (
                 // BACK-END: Renderização dinâmica das colunas do Kanban
                 kanbanStages.map((stage) => (
                   <div key={stage.id} className="bg-background rounded-lg p-3">
                     <h3 className="text-xs font-semibold text-light-text mb-3">{stage.title} ({stage.items.length})</h3>
                     {/* Mapear os cards do estágio aqui */}
                   </div>
                 ))
               )}
            </div>
          </section>

          {/* LISTA DE EQUIPE */}
          <section className="bg-white border border-divider rounded-xl p-6">
            <h2 className="font-semibold text-md mb-6">Equipe Levit</h2>
            <div className="flex flex-col gap-4">
              {teamMembers.length === 0 ? (
                // Espaço reservado estrutural para a lista de membros
                <div className="text-sm text-light-text text-center py-10">
                  Nenhum membro carregado. <br/>
                </div>
              ) : (
                // BACK-END: Lista dinâmica da equipe
                teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between pb-2 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-3">
                       <div className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-xs font-bold ${member.color}`}>
                         {member.initials}
                       </div>
                       <span className="text-sm font-medium">{member.name}</span>
                    </div>
                    <span className="px-2 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded-md">
                      {member.department}
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

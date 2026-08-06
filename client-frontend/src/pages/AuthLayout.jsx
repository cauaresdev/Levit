export default function AuthLayout({ children, bgImage = '/background 2.png' }) {
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-background bg-cover bg-center bg-no-repeat px-4"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-md flex flex-col items-center border border-divider">
        <div className="flex items-center gap-2 mb-2">
          <img src="/Logo.png" alt="Logo" className="h-12" />
          <span className="text-2xl font-bold text-primary">Levit</span>
        </div>
        {children}
      </div>
    </div>
  );
}
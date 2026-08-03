export default function AuthLayout({ children, backgroundImage = '/background 2.png' }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-muted bg-cover bg-center bg-no-repeat px-4"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="bg-background p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-md flex flex-col items-center border border-divider">
        <div className="flex items-center gap-3 mb-6">
          <img src="/Logo copy.png" alt="Levit" className="h-12" />
          <span className="font-sans font-semibold text-[22px] text-text-dark">Levit</span>
        </div>
        {children}
      </div>
    </div>
  );
}

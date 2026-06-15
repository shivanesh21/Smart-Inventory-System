function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
            Smart Inventory
          </p>
          <h2 className="text-base font-bold text-slate-900 sm:text-xl">
            Management and Demand Forecasting
          </h2>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
          className="rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100 sm:px-4"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;

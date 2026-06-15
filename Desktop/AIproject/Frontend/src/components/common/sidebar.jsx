import { Link } from "react-router-dom";

function Sidebar() {
  const linkClass =
    "rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700";

  return (
    <aside className="border-b border-slate-200 bg-white/95 px-4 py-4 shadow-sm lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:border-b-0 lg:border-r lg:px-5">
      <h1 className="mb-4 text-xl font-bold tracking-tight text-blue-700 lg:mb-8 lg:text-2xl">
        Inventory AI
      </h1>

      <nav className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-5 lg:overflow-visible lg:pb-0">
        <Link to="/" className={`${linkClass} whitespace-nowrap`}>
          Dashboard
        </Link>

        <div className="flex min-w-max gap-2 lg:min-w-0 lg:flex-col lg:border-t lg:border-slate-200 lg:pt-5">
          <p className="hidden text-xs font-semibold uppercase tracking-wide text-slate-400 lg:block">
            Products
          </p>
          <div className="flex gap-2 lg:flex-col">
            <Link to="/products" className={`${linkClass} whitespace-nowrap`}>
              Manage
            </Link>
            <Link to="/products-list" className={`${linkClass} whitespace-nowrap`}>
              List
            </Link>
            <Link to="/add-product" className={`${linkClass} whitespace-nowrap`}>
              Add
            </Link>
            <Link to="/update-product" className={`${linkClass} whitespace-nowrap`}>
              Update
            </Link>
            <Link
              to="/delete-product"
              className={`${linkClass} whitespace-nowrap text-red-600 hover:bg-red-50 hover:text-red-700`}
            >
              Delete
            </Link>
          </div>
        </div>

        <Link
          to="/sales"
          className={`${linkClass} whitespace-nowrap lg:border-t lg:border-slate-200 lg:pt-5`}
        >
          Sales
        </Link>
        <Link to="/assistant" className={`${linkClass} whitespace-nowrap`}>
          AI Assistant
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;

import Sidebar from "../components/common/sidebar";
import Navbar from "../components/common/navbar";

function Mainlayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-700 lg:flex">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <Navbar />
        <main className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Mainlayout;

import { useEffect, useState } from "react";
import SalesForm from "../components/sales/salesform";
import API from "../services/api";

function Sales() {
  const [sales, setSales] = useState([]);
  const [search, setSearch] = useState("");

  const fetchSales = () => {
    API.get("/sales")
      .then((response) => setSales(response.data))
      .catch(console.log);
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const filteredSales = sales.filter((sale) => {
    const searchText = search.toLowerCase();
    return (
      sale.product_name?.toLowerCase().includes(searchText) ||
      String(sale.product_id || "").includes(searchText) ||
      String(sale.quantity_sold || "").includes(searchText) ||
      String(sale.total_price || "").includes(searchText)
    );
  });

  return (
    <section className="mx-auto max-w-5xl space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl">Sales</h1>
        <p className="mt-1 text-sm text-slate-500">
          Record sales transactions and update product demand data.
        </p>
      </div>
      <SalesForm fetchSales={fetchSales} />

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-950">Sales History</h2>
            <p className="mt-1 text-sm text-slate-500">
              {filteredSales.length} records
            </p>
          </div>
          <input
            type="text"
            placeholder="Search sales"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:max-w-xs"
          />
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-[720px] w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <th className="px-3 py-3 font-semibold">ID</th>
                <th className="px-3 py-3 font-semibold">Product</th>
                <th className="px-3 py-3 font-semibold">Product ID</th>
                <th className="px-3 py-3 font-semibold">Quantity Sold</th>
                <th className="px-3 py-3 font-semibold">Total Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSales.length === 0 ? (
                <tr>
                  <td className="px-3 py-5 text-center text-slate-500" colSpan="5">
                    No sales found.
                  </td>
                </tr>
              ) : (
                filteredSales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-slate-50">
                    <td className="px-3 py-3 font-semibold text-slate-500">
                      {sale.id}
                    </td>
                    <td className="px-3 py-3 font-medium text-slate-900">
                      {sale.product_name}
                    </td>
                    <td className="px-3 py-3">{sale.product_id}</td>
                    <td className="px-3 py-3">{sale.quantity_sold}</td>
                    <td className="px-3 py-3">Rs {sale.total_price || 0}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Sales;

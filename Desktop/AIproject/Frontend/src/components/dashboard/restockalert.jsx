import { useEffect, useState } from "react";
import API from "../../services/api";

function RestockAlert() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/restock")
      .then((res) => {
        setProducts(res.data);
      })
      .catch(console.log);
  }, []);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-bold text-slate-950">Restock Alerts</h2>

      <div className="mt-4 space-y-3">
        {products.length === 0 ? (
          <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
            No low-stock products right now.
          </p>
        ) : (
          products.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-3 rounded-md border border-red-100 bg-red-50 px-3 py-2 text-sm"
            >
              <span className="font-semibold text-red-700">{item.product}</span>
              <span className="text-red-600">Stock: {item.current_stock}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RestockAlert;

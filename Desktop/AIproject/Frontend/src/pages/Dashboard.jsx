import { useEffect, useState } from "react";
import ForecastCard from "../components/dashboard/forecastcard";
import RestockAlert from "../components/dashboard/restockalert";
import StatsCard from "../components/dashboard/statscard";
import API from "../services/api";

function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    let isMounted = true;

    API.get("/dashboard")
      .then((response) => {
        if (isMounted) {
          setData(response.data);
        }
      })
      .catch(console.log);

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="space-y-6">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Overview
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          Smart Inventory Dashboard
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-500 sm:text-base">
          Monitor stock health, sales performance, revenue, and forecasting
          signals from one clean workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatsCard title="Products" value={data.total_products || 0} />
        <StatsCard title="Sales" value={data.total_sales || 0} />
        <StatsCard title="Revenue" value={`Rs ${data.revenue || 0}`} />
        <StatsCard
          title="Inventory Value"
          value={`Rs ${data.inventory_value || 0}`}
        />
        <StatsCard title="Low Stock" value={data.low_stock || 0} />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.75fr)]">
        <ForecastCard />
        <RestockAlert />
      </div>
    </section>
  );
}

export default Dashboard;

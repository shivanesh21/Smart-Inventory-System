import { useEffect, useState } from "react";
import API from "../../services/api";

function ForecastCard() {
  const [forecast, setForecast] = useState(0);

  useEffect(() => {
    API.get("/forecast")
      .then((res) => {
        setForecast(res.data.forecast_quantity);
      })
      .catch(console.log);
  }, []);

  return (
    <div className="rounded-lg border border-blue-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Forecast
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Forecast Demand
          </h2>
        </div>
        <div className="rounded-lg bg-blue-50 px-5 py-4 text-blue-700">
          <p className="text-xs font-semibold uppercase tracking-wide">
            Predicted Units
          </p>
          <p className="mt-1 text-3xl font-bold">{forecast || 0}</p>
        </div>
      </div>
    </div>
  );
}

export default ForecastCard;

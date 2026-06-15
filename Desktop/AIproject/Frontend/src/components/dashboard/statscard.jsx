function StatsCard({ title, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h3>
      <p className="mt-3 break-words text-2xl font-bold text-slate-950 sm:text-3xl">
        {value ?? 0}
      </p>
    </div>
  );
}

export default StatsCard;

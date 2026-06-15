import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

function SalesChart({ sales }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={sales}>
        <XAxis dataKey="product_name" />
        <YAxis />
        <Bar dataKey="total_price" fill="#2563eb" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SalesChart;

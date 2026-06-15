function ProductTable({ products = [] }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-slate-950 sm:text-2xl">
          Product List
        </h2>
        <p className="text-sm text-slate-500">{products.length} items</p>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-[720px] w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <th className="px-3 py-3 font-semibold">ID</th>
              <th className="px-3 py-3 font-semibold">Name</th>
              <th className="px-3 py-3 font-semibold">Category</th>
              <th className="px-3 py-3 font-semibold">Quantity</th>
              <th className="px-3 py-3 font-semibold">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.length === 0 ? (
              <tr>
                <td className="px-3 py-5 text-center text-slate-500" colSpan="5">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id || product._id} className="hover:bg-slate-50">
                  <td className="px-3 py-3 font-semibold text-slate-500">
                    {product.id || product._id}
                  </td>
                  <td className="px-3 py-3 font-medium text-slate-900">
                    {product.name}
                  </td>
                  <td className="px-3 py-3">{product.category}</td>
                  <td className="px-3 py-3">
                    <span>{product.quantity}</span>
                    {product.quantity < 5 && (
                      <span className="ml-2 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-700">
                        Low Stock
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-3">Rs {product.price}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductTable;

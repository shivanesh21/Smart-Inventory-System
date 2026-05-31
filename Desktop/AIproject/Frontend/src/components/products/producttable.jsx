import API from "../../services/api";

function ProductTable({ products, fetchproducts }) {
  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      alert("Product Deleted");
      fetchproducts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-5 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Category</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Price</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">{product.category}</td>
              <td className="border p-2">
                {product.quantity}
                {product.quantity < 5 && (
                  <span className="text-red-500 ml-2">Low Stock</span>
                )}
              </td>
              <td className="border p-2">₹ {product.price}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;


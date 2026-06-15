import { useEffect, useState } from "react";
import API from "../services/api";

function DeleteProductPage() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      alert("Product Deleted");
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    API.get("/products")
      .then((response) => {
        if (isMounted) {
          setProducts(response.data);
        }
      })
      .catch(console.log);

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl">
          Delete Product
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Remove discontinued or incorrect product records.
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="overflow-x-auto">
          <table className="min-w-[760px] w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <th className="px-3 py-3 font-semibold">Name</th>
                <th className="px-3 py-3 font-semibold">Category</th>
                <th className="px-3 py-3 font-semibold">Quantity</th>
                <th className="px-3 py-3 font-semibold">Price</th>
                <th className="px-3 py-3 font-semibold">Action</th>
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
                    <td className="px-3 py-3 font-medium text-slate-900">
                      {product.name}
                    </td>
                    <td className="px-3 py-3">{product.category}</td>
                    <td className="px-3 py-3">{product.quantity}</td>
                    <td className="px-3 py-3">Rs {product.price}</td>
                    <td className="px-3 py-3">
                      <button
                        type="button"
                        onClick={() => handleDelete(product.id || product._id)}
                        className="rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </td>
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

export default DeleteProductPage;

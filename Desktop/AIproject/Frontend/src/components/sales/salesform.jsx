import { useEffect, useState } from "react";
import API from "../../services/api";

function SalesForm({ fetchSales }) {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [quantitySold, setQuantitySold] = useState("");

  const fetchProducts = () => {
    API.get("/products")
      .then((response) => setProducts(response.data))
      .catch(console.log);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = productSearch
    ? products
        .filter((product) =>
          product.name.toLowerCase().includes(productSearch.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const selectProduct = (product) => {
    setProductId(String(product.id));
    setProductSearch(product.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productId) {
      alert("Please select a product from the search results");
      return;
    }

    try {
      await API.post("/sales", {
        product_id: Number(productId),
        quantity_sold: Number(quantitySold),
      });
      alert("Sale Added");
      fetchSales?.();
      fetchProducts();
      setProductId("");
      setProductSearch("");
      setQuantitySold("");
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <h2 className="text-xl font-bold text-slate-950">Add Sale</h2>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="relative sm:col-span-2">
          <input
            type="text"
            placeholder="Search product name"
            value={productSearch}
            onChange={(e) => {
              setProductSearch(e.target.value);
              setProductId("");
            }}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          {filteredProducts.length > 0 && (
            <div className="absolute z-10 mt-2 max-h-60 w-full overflow-y-auto rounded-md border border-slate-200 bg-white shadow-lg">
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => selectProduct(product)}
                  className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left text-sm transition hover:bg-slate-50"
                >
                  <span>
                    <span className="font-semibold text-slate-900">
                      {product.name}
                    </span>
                    <span className="ml-2 text-slate-500">ID {product.id}</span>
                  </span>
                  <span className="text-slate-500">Stock {product.quantity}</span>
                </button>
              ))}
            </div>
          )}

          {productSearch && filteredProducts.length === 0 && !productId && (
            <p className="mt-2 text-sm text-slate-500">No products found.</p>
          )}
        </div>

        <input
          type="number"
          placeholder="Quantity Sold"
          value={quantitySold}
          onChange={(e) => setQuantitySold(e.target.value)}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {productId && (
        <p className="mt-3 text-sm font-medium text-emerald-700">
          Selected product ID: {productId}
        </p>
      )}

      <button className="mt-5 w-full rounded-md bg-emerald-600 px-4 py-2.5 font-semibold text-white transition hover:bg-emerald-700 sm:w-auto">
        Add Sale
      </button>
    </form>
  );
}

export default SalesForm;

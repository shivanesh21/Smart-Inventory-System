import { useEffect, useState } from "react";
import ProductTable from "../components/products/ProductTable";
import API from "../services/api";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

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

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="space-y-5">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl">
          Products
        </h1>
        <input
          type="text"
          placeholder="Search Product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-4 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <ProductTable products={filteredProducts} />
    </section>
  );
}

export default ProductsPage;

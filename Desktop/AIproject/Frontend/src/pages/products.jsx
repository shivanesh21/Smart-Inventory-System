import Productform from "../components/products/productform";
import ProductTable from "../components/products/ProductTable";

function Products() {
  return (
    <section className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl">
          Products
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Add inventory items and review current stock records.
        </p>
      </div>
      <Productform />
      <ProductTable />
    </section>
  );
}

export default Products;

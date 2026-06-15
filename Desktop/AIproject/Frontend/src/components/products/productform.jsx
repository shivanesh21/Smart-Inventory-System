import { useState } from "react";
import API from "../../services/api";

function ProductForm({ fetchProducts, setProducts }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
  });

  const inputClass =
    "w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await API.post("/products", {
        ...formData,
        quantity: Number(formData.quantity),
        price: Number(formData.price),
      });

      const newProduct = resp.data?.product;
      if (newProduct && setProducts) {
        setProducts((prev) => [newProduct, ...prev]);
      } else if (fetchProducts) {
        fetchProducts();
      }

      alert("Product Added");

      setFormData({
        name: "",
        category: "",
        quantity: "",
        price: "",
      });
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
      <h2 className="text-2xl font-bold text-slate-950">Add Product</h2>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className={inputClass}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className={inputClass}
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className={inputClass}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <button className="mt-5 w-full rounded-md bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700 sm:w-auto">
        Add Product
      </button>
    </form>
  );
}

export default ProductForm;

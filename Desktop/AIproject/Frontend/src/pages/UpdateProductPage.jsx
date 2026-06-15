import { useEffect, useState } from "react";
import API from "../services/api";

const emptyForm = {
  name: "",
  category: "",
  quantity: "",
  price: "",
};

function UpdateProductPage() {
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [formData, setFormData] = useState(emptyForm);

  const fieldClass =
    "w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelect = (e) => {
    const id = e.target.value;
    const product = products.find((item) => String(item.id || item._id) === id);

    setSelectedId(id);
    setFormData(
      product
        ? {
            name: product.name || "",
            category: product.category || "",
            quantity: product.quantity || "",
            price: product.price || "",
          }
        : emptyForm
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedId) {
      alert("Please select a product");
      return;
    }

    try {
      await API.put(`/products/${selectedId}`, {
        ...formData,
        quantity: Number(formData.quantity),
        price: Number(formData.price),
      });
      alert("Product Updated");
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
    <section className="mx-auto max-w-3xl rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h1 className="text-2xl font-bold text-slate-950">Update Product</h1>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <select value={selectedId} onChange={handleSelect} className={fieldClass}>
          <option value="">Select Product</option>
          {products.map((product) => {
            const id = product.id || product._id;

            return (
              <option key={id} value={id}>
                {product.name}
              </option>
            );
          })}
        </select>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className={fieldClass}
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className={fieldClass}
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            className={fieldClass}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className={fieldClass}
          />
        </div>

        <button className="w-full rounded-md bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700 sm:w-auto">
          Update Product
        </button>
      </form>
    </section>
  );
}

export default UpdateProductPage;

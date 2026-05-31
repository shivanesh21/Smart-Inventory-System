import { useState } from "react";
import API from "../../services/api";

function ProductForm({ fetchProducts, setProducts }) {

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    price: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
      price: ""
    });

  } catch (error) {
    console.log(error);
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded shadow mb-5"
    >

      <h2 className="text-2xl font-bold mb-4">
        Add Product
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={formData.quantity}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Product
      </button>

    </form>
  );
}

export default ProductForm;
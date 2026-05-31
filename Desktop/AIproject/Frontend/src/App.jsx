import { useEffect, useState } from "react";
import API from "./services/api";
import ProductForm from "./components/products/ProductForm";
import ProductTable from "./components/products/ProductTable";
import dashboard from "./pages/Dashboard";

function App() {

  const [products, setProducts] = useState([]);
  const [search,setsearch]=useState("");
  const fetchProducts = async () => {

    try {

      const response = await API.get("/products");

      setProducts(response.data);

    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchProducts();
  }, []);
 
  const filteredproducts=products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()));
  
  return (

    <div className="p-10 bg-gray-100 min-h-screen">
        <dashboard/>
        <div className="p-10">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">
        Smart Inventory Management
      </h1>
      <input 
        type="text"
        placeholder="Search Product"
        value={search}
        onChange={(e) => setsearch(e.target.value)}
        className="border p-2 mb-5 w-full rounded"/>

      <ProductForm fetchProducts={fetchProducts} setProducts={setProducts} />

      <ProductTable products={products}
      fetchProducts={fetchProducts} />
      <ProductTable products={filteredproducts}/>
    </div>
  </div>
  );
}
export default App;
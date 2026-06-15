import { Routes,Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard"
import Products from "./pages/products";
import Sales from "./pages/sales";
import Assistant from "./pages/assistant";
import Login from "./pages/login";
import AddProductPage from "./pages/AddProductPage";
import UpdateProductPage from "./pages/UpdateProductPage";
import DeleteProductPage from "./pages/DeleteProductPage";
import ProductsPage from "./pages/ProductsPage";
import Mainlayout from "./layout/mainlayout";
function App(){
  const token=localStorage.getItem("token");
  if(!token){return<Login/>;}
  return(
      <Mainlayout>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/products-list" element={<ProductsPage/>}/>
          <Route path="/add-product" element={<AddProductPage/>}/>
          <Route path="/update-product" element={<UpdateProductPage/>}/>
          <Route path="/delete-product" element={<DeleteProductPage/>}/>
          <Route path="/sales" element={<Sales/>}/>
          <Route path="/assistant" element={<Assistant/>}/>

        </Routes>
      </Mainlayout>
  );
}
export default App;

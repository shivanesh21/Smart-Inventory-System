import { useState } from "react";
import API from "../../services/api";
function salesform({fetchsales}){
    const [productid,setproductid]=useState("");
    const[quantitysold,setquantitysold]=useState("");
    const handleSumbit =async(e) => {
        e.preventDefault();
        try{
            await API.post("/sales",{product_id:Number(productid),quantity_sold:Number(quantitysold)});
        alert("Sale Added");
        fetchsales();
        setproductid("");
        setquantitysold("");
        }
        catch(error){console.log(error);}
    };
    return(
    <form
     onSubmit={handleSumbit}
    className="bg-White p-5 rounded shadow">
    <input type="number"
        placeholder="productid"
        value={productid}
        onChange={(e)=>setproductid(e.target.value)}
        className="border p-2 w-full mb-3"/>
    <input type="number"
        placeholder="quantitysold"
        value={quantitysold}
        onChange={(e)=>setquantitysold(e.target.value)}
        className="border p-2 w-full mb-3"/>
    <button> 
        className="bg_green_500 text-white px-4 py-2 rounded
        Add Sale
        
    </button>  
</form>
    );
}
export default salesform;

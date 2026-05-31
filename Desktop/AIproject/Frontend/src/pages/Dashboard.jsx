import { useEffect,useState } from "react";
import API from "../services/api";
import statscard from "../components/dashboard/statscard";
function dashboard(){
    const[data,setData]=useState({});
    const fetchDashboard = async(e) =>{
        try{
            const response=await API.get("/dashboard");
            setData(response.data);
        }
        catch(error){
            console.log(error);
    }};
    useEffect(()=>{
        fetchDashboard();
    },[]);
    return(
        <div className="p-6">
            <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
            <div className="grid grid-cols-2md:grid-cols-5 gap-4">
                <statscard title="Products"
                value={data.total_products}/>
                <statscard title="Revenue"
                value={data.revenue}/>
                <statscard title="Inventory Value"
                value={data.inventory_value}/>
                <statscard title="Low-Stock"
                value={data.low_stock}/>
            </div>
        </div>
    );
}
export default dashboard;

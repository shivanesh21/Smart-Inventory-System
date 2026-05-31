import{Barchart,Bar,XAxis,YAxis,Tooltip,ResponsiveContainer} from "recharts";
function saleschart({sales}){
    return(
        <ResponsiveContainer width="100%" 
        height={300}>
            <Barchart data={sales}>
                <XAxis dataKey="product_name"/>
                <YAxis/>
                <Bar dataKey="total_price"/>
            </Barchart>
        </ResponsiveContainer>
    );
}
export default saleschart;

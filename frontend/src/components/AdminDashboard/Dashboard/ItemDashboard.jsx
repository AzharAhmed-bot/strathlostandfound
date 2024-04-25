/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState,useEffect } from "react";
import AdminNavProfile from "../../Admin/AdminNavProfile";
import ItemStatisticCard from "../StatitisticCards/ItemStatisticCard";
import StatisticGraph from "../Zones/StatisticGraph";
const ItemDashboard=({items,claims,categories})=>{
    const [mostLostCategory, setMostLostCategory] = useState('');

    const getTotalItems=()=> items.length;
    const getTotalClaims=()=>claims.length;

    const [state,setState]=useState( {
        options: {
            chart: {
              id: "basic-bar"
            },
            xaxis: {
              categories: []  // Updated to empty array initially
            }
          },
          series: [
            {
              name: "Lost Items",
              data: []  // Updated to empty array initially
            }
          ]
      });
      const [cat, setCat] = useState({
        options: {
          chart: {
            id: "basic-line"
          },
          xaxis: {
            categories: []  // Updated to empty array initially
          }
        },
        series: []  // Updated to empty array initially
      });
       const getCategoryName=(id)=>{
        let category=categories && categories.find((category) =>category.id===id);
    
        return category ? category.name :""
       }
     
    
      useEffect(() => {
        // Update the state based on the itemDates data
        const itemDates = items && items.map((item) => item.date);
        const ClaimCategories = claims && claims.map((claim) => claim.category_id);
        const uniqueDates = Array.from(new Set(itemDates));
        const lostItemsCount = uniqueDates.map((date) => itemDates.filter((d) => d === date).length);
        const uniqueCategories = Array.from(new Set(ClaimCategories));
        const claimsCout=uniqueCategories && uniqueCategories.map((cat)=>ClaimCategories.filter((c)=> c==cat).length)
    
        const mostLostCategoryIndex = claimsCout.indexOf(Math.max(...claimsCout));
        const mostLostCategoryName = getCategoryName(uniqueCategories[mostLostCategoryIndex]);
        setMostLostCategory(mostLostCategoryName);
    
        
    
        setState({
          ...state,
          options: {
            ...state.options,
            xaxis: {
              categories: uniqueDates
            }
          },
          series: [
            {
              name: "Lost Items",
              data: lostItemsCount
            }
          ]
        });
    
        // Prepare data for the line graph based on claims category_id
        
        
        
        setCat({
          ...cat,
          options: {
            ...cat.options,
            xaxis:{
                categories: uniqueCategories.map(categoryId => getCategoryName(categoryId))
            },
            yaxis: {
              categories: uniqueCategories
            }
          },
          series: [
            {
              name: "Number of claims in category",
              data: claimsCout
            }
          ]
        });
      }, [items, claims,categories]);

    

    return(
        <>
        <AdminNavProfile/>
        <div className="flex flex-row h-full bg-white mt-20">
        <div className="flex-grow flex flex-col">
        <ItemStatisticCard
             getTotalClaims={getTotalClaims}
             mostLostCategory={mostLostCategory}
             getTotalItems={getTotalItems}
          />
          <StatisticGraph
                    state={state}
                    cat={cat}
                    mostLostCategory={mostLostCategory}
                />
        </div>
        </div>
        </>
    )
}


export default ItemDashboard;
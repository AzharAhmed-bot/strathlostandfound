import deleteByValue from "./stateUpdaters/delete";

function handleDeleteItem(data,setItems,toast){
    
    
    fetch(`http://localhost:5000/lost_items/${data.id}`,{
     method:"DELETE",
     headers:{
         "Content-Type":"Application/json"
     }
    })
    .then((resp)=>resp.json())
    .then(()=>{
     toast.success("Item deleted successfully");
     deleteByValue(data,setItems)
 })
 }

 export default handleDeleteItem;
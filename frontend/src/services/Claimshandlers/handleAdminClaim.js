import updateByValue from "../stateUpdaters/update";

function handleAdminClaim(data,item,items,claims,setItems,setClaims,toast) {
       
    if(item.Status==="Inactive"){
        toast.error("You have already sent a claim for this Item You cant send twice.You can go ahead and delete the claim")
    }
   else{
    const patchData={
        Status:"Inactive"
    }
    fetch(`http://localhost:5000/lost_items/${data.item_id}`,{
        method:"PATCH",
        headers:{
            "Content-Type":"Application/json"
        },
        body:JSON.stringify(patchData)
    })
    .then(resp=>resp.json())
    .then((responseData)=>{
        const updatedItem=responseData.item;
        const updateItems=updateByValue(items,updatedItem);
        setItems(updateItems)
    });

     toast.success("Email has been sent successfully")
     const claimPatchData={
       Status:"Active"
     }
    fetch(`http://localhost:5000/claims/${data.id}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"Application/json"
            },
            body:JSON.stringify(claimPatchData)
        })
        .then(resp=>resp.json())
        .then((responseData)=>{
        const updatedClaim = responseData.claim;
        const updatedClaims=updateByValue(claims,updatedClaim);
        setClaims(updatedClaims)
        });
}
}

export default handleAdminClaim;
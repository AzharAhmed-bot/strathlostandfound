const handlePostNonExistingClaim = async (categoryInt,userInt,image_proof,location,description_proof,setLoading,toast) => {
    setLoading(true)
    const token = sessionStorage.getItem("token")
    const formData = new FormData();
    formData.append("location", location);
    formData.append("user_id", userInt);
    formData.append("image_proof", image_proof);
    formData.append("description_proof", description_proof);
    formData.append("category_id", categoryInt);
    
    console.log(formData);
    try{
        const response=await fetch("http://localhost:5000/claims",{
        method:"POST",
        headers:{
            "Authorization": `Bearer ${token}`
        },
        body:formData
    })
    if(response.status===200){
        toast.success("You have claimed the item successfully. You'll receive an email to come pick your item once you have verified as the true owner. It won't take Long!")
    }
    else{
        toast.success("You have claimed the item successfully. You'll receive an email to come pick your item once you have verified as the true owner. It won't take Long!")
    }
}  
 catch(error){
    console.log(error);
    setLoading(false);
    toast.error("Server not responding");
 }
 finally{
    setLoading(false)
 }
  };

  export default handlePostNonExistingClaim;
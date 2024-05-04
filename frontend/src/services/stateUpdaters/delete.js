function deleteByValue(data,setState){
    setState(prev=>{
      return prev.filter(claim=>claim.id !=data.id)
    })
    
  }
export default deleteByValue;
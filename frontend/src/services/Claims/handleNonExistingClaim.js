export const handleNonExistingClaim=(claim,setAssociation,isOpen,setisOpen)=>{
        
    setAssociation(claim.id)
    setisOpen(!isOpen)
}
export const onClose=(setisOpen)=>{
    setisOpen(false);
 }

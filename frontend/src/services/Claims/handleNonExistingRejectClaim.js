import updateByValue from "../stateUpdaters/update";

function handleNonExistingRejectClaim(data,claims,setClaims,toast) {
      
    if(data.Status=="Inactive"){
      toast.error("Claim already rejected");
      return 0;
    }
    fetch(`http://localhost:5000/claims/${data.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Status: "Inactive" }), 
    })
      .then((resp) => resp.json())
      .then((responseData) => {
        // Update the claim status in the local state
        const updatedClaim=responseData.claim;
        const updatedClaims=updateByValue(claims,updatedClaim);
        setClaims(updatedClaims);
        toast.success("Claim rejected Successfully!");
        console.log('Claim rejected successfully');
      })
      .catch((error) => console.log(error));
  }

export default handleNonExistingRejectClaim;
import updateByValue from "../stateUpdaters/update";

function handleRejectClaim(data,claims,setClaims,toast) {
    const claimPatchData = {
      Status: "Inactive"
    };
  
    fetch(`http://localhost:5000/claims/${data.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(claimPatchData)
    })
    .then(resp => resp.json())
    .then(responseData => {
      const updatedClaim = responseData.claim;
      const updatedClaims=updateByValue(claims,updatedClaim);
      setClaims(updatedClaims);
      toast.success("Claim rejected Successfully due to invalid owner!");
    })
    .catch(error => console.log(error));
  }

  export default handleRejectClaim;
import deleteByValue from "../stateUpdaters/delete";

function handleDeleteClaim(data,setClaims,toast){
    fetch(`http://localhost:5000/claims/${data.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/json',
      }
    })
      .then((resp) => resp.json())
      .then(() => {
        deleteByValue(data,setClaims)
        toast.success("Claim rejected Successfully due to invalid owner!")
        
        
      })
      .catch((error) => console.log(error));
};

export default handleDeleteClaim;
   
function updateByValue(updatedData, setState) {
    setState(prevState => {
      return prevState.map(claim => {
        if (claim.id === updatedData.id) {
          // Merge the updated data with the existing claim
          return { ...claim, ...updatedData };
        }
        return claim;
      });
    });
  }
  
  export default updateByValue;
  
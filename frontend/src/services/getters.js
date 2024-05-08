export const getCategoryName = (categoryId, categories) => {
    const category = categories && categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Unknown Category';
};
export  const getCategoryId = (categoryName,categories) => {
  const foundCategory = categories && categories.find((cat) => cat.name === categoryName);
  return foundCategory ? foundCategory.id : null;
};


export const getUserName = (userId, users) => {
    const user = users && users.find((user) => user.id === userId);
    return user ? user.name : 'Unknown User';
};
  
export const getUserEmail = (userId, users) => {
    const user = users && users.find((user) => user.id === userId);
    return user ? user.email : 'Unknown Email';
};

export const getClaimId = (itemId, claims) => {
    const claim = claims && claims.find((claim) => claim.item_id === itemId);
    return claim ? claim.id : null;
  };
  

export const getItemName = (itemId, items) => {
    const item = items && items.find((item) => item.id === itemId);
    return item ? item.name : 'Unknown name';
};

//Function to calcultate unanswered questions
export const getUnansweredQuestions = (reviews) => reviews && reviews.filter((q)=>q.answer===null).length;
  // Function to calculate answered questions
export const getAnsweredQuestions=(reviews)=> reviews && reviews.filter((q)=>q.answer!==null).length;    
  // Function to get all questions
export const getTotalQuestions=(reviews)=>reviews.length;




  
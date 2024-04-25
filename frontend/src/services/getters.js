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
  
  export const getItemName = (itemId, items) => {
    const item = items && items.find((item) => item.id === itemId);
    return item ? item.name : 'Item name';
  };
  
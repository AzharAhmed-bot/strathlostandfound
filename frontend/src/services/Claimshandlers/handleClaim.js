export default function handleClaim(items,item,navigate,getCategoryName,getItemName,categories,toast) {
  if (item.Status === "Active" || item.Status === "Pending") {
    navigate("/home/claim");

    localStorage.setItem("item_id", item.id);
    const categoryInt = parseInt(item.category_id);
    const categoryName = getCategoryName(categoryInt, categories);
    localStorage.setItem("category_id", categoryInt);
    localStorage.setItem("category_name", categoryName);

    const itemInt = parseInt(item.id);
    const itemName = getItemName(itemInt,items);
    localStorage.setItem("item_id", itemInt);
    localStorage.setItem("item_name", itemName);
  } else {
    toast.error("This Item has already been claimed back to the owner");
  }
}



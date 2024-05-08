const handlePostItem =async (name,location,date,user_id,image,description,category,setLoading,token,toast) => {
    console.log(image)
    const category_id = parseInt(category)
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("location", location);
    formData.append("date", date);
    formData.append("user_id", user_id);
    formData.append("image", image);
    formData.append("description", description);
    formData.append("category_id", category_id);
    
    console.log(formData);
    
    
    
    try {
      const response = await fetch("http://localhost:5000/lost_items", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      })
      const data = await response.json()
      if (response.status === 201) {
        toast.success("Item posted successfully");
        console.log(data)
      }
      else {
        console.log(data)
        toast.error("Item not posted successfully")
      }
    }
    catch (error) {
    toast.error("Server not responding");
      console.log(error)
    }
    finally {
      setLoading(false)
    }

  }

export default handlePostItem
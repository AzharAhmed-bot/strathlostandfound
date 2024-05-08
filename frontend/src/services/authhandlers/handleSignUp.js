
const handleSignUp = async (name,email,password,phone_number,toast,navigate,checkEmailFormat,setIsLoading,setEmailError,setPhoneError,setError) => {
    setIsLoading(true);
    try {
      checkEmailFormat(email);
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({ name, email, password, phone_number }),
      });
      if (response.status === 200) {
        toast.success("Account created successfully. Proceed to the login page!");
        navigate("/login");
      } else if (response.status === 403) {
        setPhoneError("Phone Number should be in the format +2547*********");
      } else if (response.status === 402) {
        setEmailError(" Use your Strathmore email!");
      } else if (response.status === 401) {
        setEmailError("Email already exists");
      }
    } catch (error) {
      setError("Unable to send request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };



  export default handleSignUp;
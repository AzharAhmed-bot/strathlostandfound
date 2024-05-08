// Handles the sign-in process for a user with the provided email and password
// Sets the loading state to true, and clears any existing email and password errors
export const handleSignIn = async (email, password, setLoading, setemailError, setpasswordError, setError, navigate, toast) => {
    setLoading(true);
    setpasswordError("");
    setemailError("");
    
    // Attempts to fetch data from the login endpoint with the provided email and password
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      
    // If the response status is 200, the login was successful
    if (response.status === 200) {
        toast.success("Successfully Logged In");
        console.log("Login Successful");

    // If the user is not a student, set the role in sessionStorage and navigate to the admin page
    if (data.role === "student") {
            navigate("/home");
        } else {
          sessionStorage.setItem("role", data.role);
          navigate("/admin");
        }
    // Store the secret, access token, refresh token, user ID, and token expiration time in sessionStorage
    sessionStorage.setItem("role", data.role);
    sessionStorage.setItem("token", data.access_token);
    sessionStorage.setItem("refresh_token", data.refresh_token);
    sessionStorage.setItem("user_id", data.id);
    sessionStorage.setItem("token_expiration_time", data.session_expiration);

     // If the response status is 400, the account is deactivated
    } else if (response.status === 400) {
        setemailError("Account is Deactivated!");

    // If the response status is 401, the password is invalid
      } else if (response.status === 401) {
        setpasswordError("Invalid password. Please try again.");

    // If the response status is 402, the email doesn't exist
      } else if (response.status === 402) {
        setemailError("Email doesn't Exist. Please register an account");
      }
    
    // If an error occurs, set the error state
    } catch (error) {
      setError("An error occurred. Please try again later.");
    
    // Set the loading state to false after the fetch request is complete
    } finally {
      setLoading(false);
    }
  };
  
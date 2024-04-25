/* eslint-disable react-hooks/rules-of-hooks */
import {useEffect} from "react";

export const refreshToken = async () => {
    const refreshTokenVar = sessionStorage.getItem("refresh_token");
  
    if (refreshTokenVar) {
      try {
        const response = await fetch("http://localhost:5000/refresh", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshTokenVar}`,
          },
        });
   
        if (response.ok) {
          const data = await response.json();
          console.log("Token refreshed successfully");
          sessionStorage.removeItem("token");
          sessionStorage.setItem("token", data.access);
        } else {
          console.error("Failed to refresh token", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error during token refresh", error);
      }
    }
  };

  

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const refreshTokenInterval=setInterval(()=>{
      refreshToken()
    }, 179999)
  
    // Return a cleanup function to clear the interval when the component unmounts
   
  }, []);
 
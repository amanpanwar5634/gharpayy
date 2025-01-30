document.getElementById("logoutBtn").addEventListener("click", async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
      });
  
      if (response.ok) {
        localStorage.removeItem("jwt_token"); 
      sessionStorage.removeItem("jwt_token");
        window.location.href = "http://localhost:5000/admin"; 
      } else {
        const error = await response.json();
        alert(error.message || "Failed to log out.");
      }
    } catch (err) {
      console.error("Error during logout:", err);
      alert("An error occurred while logging out.");
    }
  });
  
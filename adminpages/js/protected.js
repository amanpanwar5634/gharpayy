function loadDashboard() {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/admin"; 
      return;
    }

    fetch("/dashboard", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Unauthorized");
        return response.text();
      })
      .then((html) => {
        document.open();
        document.write(html);
        document.close();
      })
      .catch(() => {
        localStorage.removeItem("token"); 
        window.location.href = "/login"; 
      });
  }

  function loadProtectedPage(page) {
    console.log("Loading protected page:", page);

    // Get the token from localStorage
    const token = localStorage.getItem("token");
    console.log("Token retrieved from localStorage:", token);

    // Check if the token exists
    if (!token) {
        console.log("No token found, redirecting to login page.");
        window.location.href = "/admin";  // Redirect to login if no token
        return;
    }

    // Fetch the protected page with the token in the Authorization header
    console.log(`Fetching ${page} with token...`);
    fetch(`http://localhost:5000/${page}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    })
        .then((response) => {
            if (!response.ok) {
                console.log("Unauthorized access or invalid response.");
                throw new Error("Unauthorized");
            }
            console.log("Page fetched successfully.");
            return response.text();
        })
        .then((html) => {
            console.log("HTML content received, writing to document.");
            document.open();
            document.write(html);
            document.close();
        })
        .catch((error) => {
            console.error("Error during fetch:", error);
            localStorage.removeItem("token");  // Remove the invalid token
            console.log("Token removed, redirecting to login.");
            window.location.href = "/admin";  // Redirect to login
        });
}


  
document.addEventListener("DOMContentLoaded", async () => {
    const apiEndpoint = "http://localhost:5000/api/listings";
    const tableBody = document.getElementById("table-body");

    try {
        const response = await fetch(apiEndpoint);
        const listings = await response.json();

        tableBody.innerHTML = "";

        listings.forEach((listing, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
          <th class="p-3">#${index + 1}</th>
          <td class="p-3">
            <span class="ms-2">${listing.name}</span>
          </td>
          <td class="text-center p-3">${listing.gender}</td>
          <td class="text-center p-3">${listing.location}</td>
          <td class="text-center p-3">${listing.propType}</td>
          <td class="text-center p-3">
            <div class="badge ${listing.status === "open"
                    ? "bg-soft-success"
                    : "bg-soft-danger"
                } rounded px-3 py-1">
              ${listing.status === "open" ? "Open" : "Not Open"}
            </div>
          </td>
          <td class="text-center p-3">${listing.openDate}</td>
          <td class="text-end p-3">
      <button class="btn btn-sm btn-primary view-btn" data-id="${listing._id}">View</button>
      <a href="#" class="btn btn-sm btn-danger ms-2">Disable</a> </td>
        `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        tableBody.innerHTML =
            "<tr><td colspan='8' class='text-center p-3'>Failed to load data</td></tr>";
    }

    document.querySelectorAll(".view-btn").forEach((btn) => {
        btn.addEventListener("click", (event) => {
          const listingId = event.target.getAttribute("data-id");
          window.location.href = `http://localhost:5000/invoice.html?id=${listingId}`;
        });
      });
});




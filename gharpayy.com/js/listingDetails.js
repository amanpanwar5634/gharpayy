const urlParams = new URLSearchParams(window.location.search);

const listingId = urlParams.get('id');
console.log(listingId);

fetch(`http://localhost:5000/api/listings/${listingId}`)
    .then(response => response.json())
    .then(data => {

        document.getElementById('listing-title').textContent = data.name;
        document.getElementById('room-type').textContent = data.propType;

        const openingInfo = document.getElementById('opening-info');
        if (data.status === "open") {
            openingInfo.textContent = "Available immediately";
        } else {
            openingInfo.textContent = `Opening in ${data.openDate}`;
        }

        document.getElementById('main-image').src = data.photos[0];



        const amenities = data.amenities;
        console.log("amenities", amenities);

        // kitchen

        const kitchenEssentials = amenities.kitchenEssentials;
        const kitchenList = document.getElementById('kitchen-list');
        kitchenEssentials.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            kitchenList.appendChild(li);
        });

        // utilities

        const utilities = amenities.utilities;
        const utilitiesList = document.getElementById('utilities-list');
        utilities.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            utilitiesList.appendChild(li);
        });

        // Comfort
        const comfort = amenities.comfort;
        const comfortList = document.getElementById('comfort-list');
        comfort.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            comfortList.appendChild(li);
        });

        // Facilities
        const facilities = amenities.facilities;
        const facilitiesList = document.getElementById('facilities-list');
        facilities.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            facilitiesList.appendChild(li);
        });

        // Security
        const security = amenities.security;
        const securityList = document.getElementById('security-list');
        security.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            securityList.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

function formatCategoryName(category) {
    return category
        .split(/(?=[A-Z])/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}
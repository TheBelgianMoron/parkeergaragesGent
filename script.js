//variables
const apiURL = "https://data.stad.gent/api/explore/v2.1/catalog/datasets/bezetting-parkeergarages-real-time/records?limit=20";
const parkingContainer = document.getElementById('parkingData');

// Add Leaflet map to the page
let map = L.map('map').setView([51.053581, 3.722969], 13);
// Add base map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Function to fetch and display parkingdata
async function fetchDataAndDisplayData() {
    try {
        //fetch data
            const response = await fetch(apiURL);
            if (!response.ok) {
                throw new Error('Failed to catch data!:', response.status);
            };
            // console.log(response);
            const data = await response.json();
            console.log(data);
            const parkingData = data.results;

        //display data
            parkingData.forEach(parkingData => {
                const { name, occupation, availablecapacity, isopennow, location } = parkingData;
                const occupied = occupation;
                const status = isopennow ? 'open' : 'closed';

                //create elements
                const parkingElement = document.createElement('div');
                parkingElement.className = 'parking';
                parkingElement.innerHTML = `    
                    <h2>${name}</h2>
                    <p>Total capacity: ${availablecapacity}</p>
                    <p>Spaces left: ${availablecapacity - occupied}</p>
                    <p class="${isopennow ? 'open' : 'closed'}">Status: ${status}</p>
                `;
                parkingContainer.appendChild(parkingElement);
                //add marker to map
                displayOnMap(location)
            });
    } catch (error) {
        console.error('Fault in fetchDataAndDisplayData:', error);
    } finally {
        console.log('Function fetchDataAndDisplayData completed');
    };
};

function displayOnMap(location) {
    const { lat, lon } = location;
    const customIcon = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/252/252025.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, 32]
    });
    L.marker([lat, lon], { icon: customIcon }).addTo(map);
};

fetchDataAndDisplayData();
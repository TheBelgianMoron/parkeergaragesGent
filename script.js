//variables
const apiURL = "https://data.stad.gent/api/explore/v2.1/catalog/datasets/bezetting-parkeergarages-real-time/records?limit=20";
const parkingContainer = document.getElementById('parkingData');

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
                const { name, occupation, availablecapacity, isopennow } = parkingData;
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
            });
    } catch (error) {
        console.error('Fault in fetchDataAndDisplayData:', error);
    } finally {
        console.log('Function fetchDataAndDisplayData completed');
    };
};

fetchDataAndDisplayData();
//The first line creates a new Leaflet map object with the ID "mymap" and sets the initial view to a latitude and longitude of 19.5937 and 78.9629, respectively, with a zoom level of 5.
let map = L.map("mymap").setView([19.5937, 78.9629], 5);
let ourData = [];
//adds a tile layer to the map using OpenStreetMap tiles and sets some options for the layer, such as the maximum and minimum zoom levels and the tile size.
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
    maxZoom: 20,
    minZoom: 2,
    tileSize: 512,
    zoomOffset: -1,
}).addTo(map);
// set some options for a custom icon that will be used for the markers on the map.
let iconOption = {
    iconUrl: "./assets/location-marker.svg",
    iconSize: [30, 30],
};
let ourCustomIcon = L.icon(iconOption);
//fetch data from a JSON file that contains information about hotels, and then loops through the data to create markers for each hotel on the map. It also adds each hotel's name to a dropdown menu on the page.
fetch("./assets/location-data.json")
    .then((response) => response.json())
    .then((data) => {
        ourData = data;
        for (let i = 0; i < data.length; i++) {
            let option = document.createElement("option");
            option.value = i + 1;
            option.text = data[i].title;
            document.querySelector(".select-dropdown").appendChild(option);

            let marker = L.marker([data[i].latitude, data[i].longitude], {
                    icon: ourCustomIcon,
                })
                .bindPopup(
                    `<h3> ${data[i].title} </h3>  
<p> ${data[i].description} </p> 
`
                )
                .on("click", () => {
                    map.flyTo([data[i].latitude, data[i].longitude], data[i].zoomLevel);
                })
                .addTo(map);
        }
    })
    .catch((error) => alert(error));
// add an event listener to a button on the page that zooms the map out to the initial view when clicked.
document.querySelector(".map-zoom-out-btn").addEventListener("click", () => {
    console.log("Zoom Out button clicked");
    map.flyTo([35.2433, -3.9368], 5);
});

//add an event listener to a button on the page that zooms the map to the location of the selected hotel when clicked.
document.querySelector(".search-btn").addEventListener("click", () => {
    let select = document.querySelector(".select-dropdown");
    let value = select.options[select.selectedIndex].value;
    map.flyTo(
        [ourData[value - 1].latitude, ourData[value - 1].longitude],
        ourData[value - 1].zoomLevel
    );
});
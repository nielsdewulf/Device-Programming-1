'use strict';

let mymap;
const kaarten = ['OpenStreetMap', 'OpenTopoMap', 'OpenMapSurfer', 'Hydda', 'Stamen', 'Esri', 'MtbMap', 'CartoDB', 'HikeBike', 'Wikimedia'];
let layerGroup = [L.featureGroup(), L.featureGroup(), L.featureGroup()];
//#region GET
const getParkings = function () {
    handleData('parkings.json', showParking);
}
//#endregion

//#region show
const showMarker = function () {
    var howest = L.icon({
        iconUrl: './images/howest-hogeschool-logo.png',
    });
    L.marker([50.824683, 3.249550], {icon: howest}).addTo(mymap);

}
const showCircle = function (x, y, state) {
    let color = '';
    let id = 0;
    switch (state) {
        case 'Unknown':
            id = 2;
            color = 'grey';
            break;
        case 'Occupied':
            id = 0;
            color = 'red';
            break;
        case 'Free':
            id = 1;
            color = 'green';
            break;
    }

    var circle = L.circle([x, y], {
        color: color,
        fillColor: color,
        fillOpacity: 0.5,
        radius: 2
    });
    layerGroup[id].addLayer(circle);
// .addTo(layerGroup[state])
}
const showParking = function (jsondata) {
    for (let p of jsondata.Sensoren.Sensor) {
        showCircle(p['@Lat'], p['@Long'], p['@State']);
    }
    for (const layer of layerGroup) {
        if (document.querySelectorAll('input')[layerGroup.indexOf(layer)].checked) {
            mymap.addLayer(layer);
        }
    }
}
const showMaps = function () {
    let str = '';
    for (const map of kaarten) {
        str += `<option value=${kaarten.indexOf(map)}>${map}</option>`;
    }
    document.querySelector('#keuze').innerHTML = str;
    document.querySelector('#keuze').addEventListener('input', listenToMapChange);
}
const showRandomMap = function () {
    const rand = Math.floor(Math.random() * kaarten.length);
    document.querySelector("#keuze").selectedIndex = rand;
    console.log(rand);
    L.tileLayer.provider(kaarten[rand]).addTo(mymap);
}
//#endregion

//#region ListenTo
const listenToMapChange = function (el) {
    const value = el.target.value;
    L.tileLayer.provider(kaarten[value]).addTo(mymap);
}
const listenToMapFilter = function () {
    for (let check of document.querySelectorAll('input')) {
        check.addEventListener('input', function (el) {
            let val = el.target.value;
            console.log(val);
            if (el.target.checked) {
                mymap.addLayer(layerGroup[parseInt(val)]);
            } else {
                mymap.removeLayer(layerGroup[parseInt(val)]);
            }

        })
    }
}
//#endregion

//#region init
const init = function () {
    showMaps();
    mymap = L.map('mapid').setView([50.824683, 3.249550], 13);
    showRandomMap();
    showMarker();
    getParkings();
    listenToMapFilter();
};

document.addEventListener('DOMContentLoaded', function () {
    console.info('DOM geladen');
    init();
});
//#endregion

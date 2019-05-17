'use strict';

const laadDataPartago = function () {
    fetch('https://datatank.stad.gent/4/mobiliteit/deelwagenspartago')
        .then(function (response) {
            if (!response.ok) {
                throw Error(
                    `Looks like there was a problem. Status Code: ${response.status}`
                );
            } else {
                return response.json();
            }
        })
        .then(function (jsonObject) {
            verwerkAutos(jsonObject);
        })
        .catch(function (error) {
            console.error(`fout bij verwerken json ${error}`);
        });
};

const verwerkAutos = function (jsonObject) {
    console.log('*** Volgende auto\'s zijn beschikbaar');
    for (let auto of jsonObject) {
        console.log(`${auto.displayName} rijdt op ${auto.vehicleInformation.fuelType}`)
    }
};

document.addEventListener('DOMContentLoaded', function () {
    laadDataPartago();
});

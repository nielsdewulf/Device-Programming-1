'use strict';

let uri =
    'https://datatank.stad.gent/4/mobiliteit/bluebikedeelfietsensintpieters';

const laadBlueBikeInfo = function () {
    fetch(uri)
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
            verwerkBluebike(jsonObject);
        })
        .catch(function (error) {
            console.error(`fout bij verwerken json ${error}`);
        });
};

const verwerkBluebike = function (jsondata) {
    let attr = jsondata.properties.attributes;
    let cont = document.querySelector('.gebruik');
    let total = 0;
    let data = '';
    let capacityInUse = 0;
    let capacityAvailable = 0;
    let CapacityInMaintenance = 0;
    for (let el of attr) {
        switch (el.attributeName) {
            case 'CapacityInUse':
                capacityInUse = el.value;
                break;
            case 'CapacityAvailable':
                capacityAvailable = el.value;
                break;
            case 'CapacityInMaintenance':
                CapacityInMaintenance = el.value;
                break;
            case 'CapacityTotal':
                total = el.value;
                break;
        }
    }
    document.querySelector('.cover h1').innerHTML =
        jsondata.properties.description + ` (${total})`;
    document.querySelector('#boodschap').innerHTML =
        capacityInUse > total / 2
            ? 'Haast je, meer dan de helft is reeds in gebruik!'
            : 'Nog voldoende fietsen beschikbaar';
    cont.innerHTML = `<div class="ingebruik">
  <h2>In gebruik</h2>
  <div class="aantal">${capacityInUse}</div>
</div>
<div class="beschikbaar">
  <h2>Beschikbaar</h2>
  <div class="aantal">${capacityAvailable}</div>
</div>
<div class="defect">
  <h2>Buiten gebruik</h2>
  <div class="aantal">${CapacityInMaintenance}</div>
</div>`;
};

document.addEventListener('DOMContentLoaded', function () {
    laadBlueBikeInfo();
});

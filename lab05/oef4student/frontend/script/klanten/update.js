'use strict';
const toonKlantenUI = function (data) {
    document.querySelector('#KlantID').value = data[0].KlantID;
    document.querySelector('#FNaam').value = data[0].FNaam;
    document.querySelector('#VNaam').value = data[0].VNaam;
    document.querySelector('#Straat').value = data[0].Straat;
    document.querySelector('#Nummer').value = data[0].Nummer;
    document.querySelector('#Postcode').value = data[0].Postcode;
    document.querySelector('#Gemeente').value = data[0].Gemeente;
};

const updateKlant = function (jsonObject) {
    console.log(jsonObject);
    document.querySelector('#result').innerHTML = `${jsonObject.klantID}`;
};

const init = function () {
    console.info('Toont Klanten');
    // Ophalen van de bestaande gegevens van de klant.
    const id = new URLSearchParams(window.location.search).get('id');
    handleData(`http://127.0.0.1:5000/api/v1/klanten/${id}`, toonKlantenUI, 'GET');

    document.querySelector('#update').addEventListener('click', function () {
        const body = {
            FNaam: document.querySelector('#FNaam').value,
            VNaam: document.querySelector('#VNaam').value,
            Gemeente: document.querySelector('#Gemeente').value,
            Nummer: document.querySelector('#Nummer').value,
            Postcode: document.querySelector('#Postcode').value,
            Straat: document.querySelector('#Straat').value
        };
        handleData(`http://127.0.0.1:5000/api/v1/klanten/${id}`, updateKlant, 'PUT', JSON.stringify(body));
    });
};

document.addEventListener('DOMContentLoaded', function () {
    console.info('DOM geladen');
    init();
});

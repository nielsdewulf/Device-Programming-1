'use strict';

const updateKlaar = function (jsonObject) {
    document.querySelector('#result').innerHTML = `Klant ${jsonObject.klantID} toegevoegd.`;
};

const init = function () {
    document.querySelector('#add').addEventListener('click', function (el) {
        const body = {
            FNaam: document.querySelector('#FNaam').value,
            VNaam: document.querySelector('#VNaam').value,
            Gemeente: document.querySelector('#Gemeente').value,
            Nummer: document.querySelector('#Nummer').value,
            Postcode: document.querySelector('#Postcode').value,
            Straat: document.querySelector('#Straat').value
        };

        handleData('http://127.0.0.1:5000/api/v1/klanten_json', updateKlaar, 'POST', JSON.stringify(body));
    });
};

document.addEventListener('DOMContentLoaded', function () {
    console.info('DOM geladen');
    init();
});

'use strict';

const toonKlanten = function (jsonObject) {
    document.querySelector('#klanten').innerHTML = maakTabel(jsonObject, 'KlantID');
};

const init = function () {
    console.info('Toont Klanten');
    handleData('http://127.0.0.1:5000/api/v1/klanten', toonKlanten);
};

document.addEventListener('DOMContentLoaded', function () {
    console.info('DOM geladen');
    init();
});

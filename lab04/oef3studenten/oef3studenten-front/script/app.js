'use strict';
const arrVakken = ['Device Programming 1', 'Data Communication', 'Data Management', 'User Interface Design', 'Project 1'];

const init = function () {
    laadOpties()
    document.querySelector('#studenten').addEventListener('input', laadStudent);
}

const laadOpties = function () {
    fetch('http://localhost:5000/api/v1/studenten')
        .then(function (response) {
            if (!response.ok) {
                throw Error(`Probleem bij de fetch(). Status Code: ${response.status}`);
            } else {
                console.info('Er is een response teruggekomen van de server');
                return response.json();
            }
        })
        .then(function (jsonObject) {
            console.info('json object is aangemaakt');
            console.info('verwerken data');
            pushOptions(jsonObject)
        })
        .catch(function (error) {
            console.error(`fout bij verwerken json ${error}`);
        });
};

const pushOptions = function (jsonOb) {
    let str = '';
    for (let opt of jsonOb.studenten) {
        str += `<option value="${opt}">${opt}</option>`;
    }
    document.querySelector('#studenten').innerHTML = str;
}

const laadStudent = function (el) {
    fetch(`http://localhost:5000/api/v1/studenten/${el.target.value}`)
        .then(function (response) {
            if (!response.ok) {
                throw Error(`Probleem bij de fetch(). Status Code: ${response.status}`);
            } else {
                console.info('Er is een response teruggekomen van de server');
                return response.json();
            }
        })
        .then(function (jsonObject) {
            console.info('json object is aangemaakt');
            console.info('verwerken data');
            pushPunten(jsonObject)
        })
        .catch(function (error) {
            console.error(`fout bij verwerken json ${error}`);
        });
}

const pushPunten = function (jsonOb) {
    let str = '';
    let teller = 0;
    for (let punt of jsonOb.punten) {
        str += `<div class="resultaat-container ${bepaalPuntClass(punt)}">
        <div class="module">
        ${arrVakken[teller]}
        </div>
        <div class="punt">
        ${punt}
        </div>
        <div class="puntenbalk" style="width:${punt * 5}%"></div>
        </div>`;
        teller++;
    }
    document.querySelector('#detail-container').innerHTML = str;
}

const bepaalPuntClass = function (punt) {
    return punt < 10 ? 'gebuisd' : 'geslaagd';
}

document.addEventListener('DOMContentLoaded', function () {
    init();
});
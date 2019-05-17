'use strict';

let arrayMetAlleGames = new Array();
const APIKey = 'xxx';
const uri = `https://www.diero.be/NMCT/JSON/spellen.json`;
const loadData = function () {
    fetch(uri)
        .then(function (response) {
            if (!response.ok) {
                throw Error(`Looks like there was a problem. Status Code: ${response.status}`);
            } else {
                return response.json();
            }
        })
        .then(function (jsonObject) {
            parseData(jsonObject);
        })
        .catch(function (error) {
            console.error(`fout bij verwerken json error`);
        });
};
const genereerOptionRegel = function (id, naam) {
    return `<option value="${id}">${naam}</option>`;
};
const parseData = function (data) {
    let inhoudSelect = '';
    for (let spel of data) {
        arrayMetAlleGames[spel.gameId.toString()] = spel.image;
        inhoudSelect += genereerOptionRegel(spel.gameId, spel.name);
    }
    document.querySelector('#spel').innerHTML += inhoudSelect;
};
const changeImage = function (el) {
    let sp = el.target.value;
    let d = document.querySelector('#thumb');
    d.innerHTML = `<img width="620px" src="${arrayMetAlleGames[sp]}">`;
};
const registerEvents = function () {
    let select = document.querySelector('#spel');
    select.addEventListener('input', changeImage);
};
document.addEventListener('DOMContentLoaded', function () {
    loadData();
    registerEvents();
});

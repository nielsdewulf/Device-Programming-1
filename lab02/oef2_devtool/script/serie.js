'use strict';

const laadSerieInfo = function () {
    fetch('http://api.tvmaze.com/singlesearch/shows?q=Homeland&embed=episodes')
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
            verwerkSerie(jsonObject);
        })
        .catch(function (error) {
            console.error(`fout bij verwerken json ${error}`);
        });
};

const verwerkSerie = function (jsonObject) {
    console.log(`De naam van de serie is ${jsonObject.name}`);
    console.log(`Het uur wanneer het wordt uitgezonden is ${jsonObject.schedule.time}`);
    console.log("Volgende genres:");
    for (let genre of jsonObject.genres) {
        console.log(`\t- ${genre}`)
    }
    console.log('Overzicht episodes');
    for (let episode of jsonObject._embedded.episodes) {
        console.log(`S${episode.season} E${episode.number < 10 ? `0${episode.number}` : episode.number} - ${episode.name}`)
    }


};

document.addEventListener('DOMContentLoaded', function () {
    laadSerieInfo();
});

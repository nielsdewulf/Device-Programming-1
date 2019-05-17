'use strict';
const init = function () {
    document.querySelector('#zoek').addEventListener('click', laadData);
    resetTraceSteps();
};
const laadData = function () {
    resetTraceSteps();
    const content = document.querySelector('#trace-nr').value;
    if (content) {
        fetch(`http://127.0.0.1:5000/api/v1/track/${content}`)
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
                verwerkData(jsonObject);
            })
            .catch(function (error) {
                console.error(`fout bij verwerken json ${error}`);
            });
    }
};
const verwerkData = function (json) {
    const det = json.detail;
    const naam = det.naam;
    const postcode = det.postcode;
    document.querySelector('#naam-verzender').innerHTML = naam;
    document.querySelector('#postcode-verzender').innerHTML = postcode;
    const datums = [det.afgifte, det.sorteercentrum, det.onderweg, det.bezorgd];
    const tracesteps = document.querySelectorAll('.trace-step');
    let teller = 0;
    for (const step of tracesteps) {
        if (datums[teller]) {
            step.querySelector('.datum').innerHTML = datums[teller];
            step.classList.add('done');
            if (!datums[teller + 1]) {
                step.classList.add('actief');
            }
        }
        teller++;
    }
};

const resetTraceSteps = function () {
    const steps = document.querySelectorAll('.trace-step');
    for (const step of steps) {
        step.classList.remove('done', 'actief');
        step.querySelector('.datum').innerHTML = '????-??-??';
    }
};

document.addEventListener('DOMContentLoaded', function () {
    init();
});

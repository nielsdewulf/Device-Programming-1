'use strict';

const toonWaarde = function (el) {
    console.log('Hij beweegt');
    const scoreWaarde = el.target.value;
    console.log(scoreWaarde);
    document.querySelector('#scorewaarde').innerHTML = scoreWaarde;
};
const voegEventToe = function () {
    console.log('event w toegevoegd');
    const scroller = document.querySelector('input[type=range]');
    document.addEventListener('input', toonWaarde);
};

document.addEventListener('DOMContentLoaded', function () {
    voegEventToe();
});

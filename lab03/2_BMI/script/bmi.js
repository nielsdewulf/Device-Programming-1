'use strict';
let gewicht, lengte, button;

const checkValues = function () {
    console.log('kiesak');
    if (gewicht.value >= 35 && gewicht.value <= 200) {
        if (lengte.value >= 150 && lengte.value <= 200) {
            button.disabled = false;
        } else {
            button.disabled = true;
        }
    } else {
        button.disabled = true;
    }
};
const calculateBMI = function () {
    const lengteInMeter = lengte.value / 100;
    const bmi = gewicht.value / lengteInMeter ** 2;
    alert(bmi);
};
const eventListenersToevoegen = function () {
    gewicht.addEventListener('input', checkValues);
    lengte.addEventListener('input', checkValues);
    button.addEventListener('click', calculateBMI);
};

const init = function () {
    gewicht = document.querySelector('#gewicht');
    lengte = document.querySelector('#lengte');
    button = document.querySelector('input[type=button]');

    button.disabled = 'disabled';
    eventListenersToevoegen();
};
document.addEventListener('DOMContentLoaded', function () {
    init();
});

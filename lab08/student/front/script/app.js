'use strict';
let addButton, wave, percentage, socket;
const lanIP = '127.0.0.1';
const dailyGoal = 1600;
let currentProgress = 0; // in percentage

const enableSocketIO = function () {
    socket = io(`http://${lanIP}:5000`);
    socket.on('welcome', function (data) {
        logDrink(data.currentProgress, true)
    });
};

const logDrink = function (ml, initial = false) {
    console.log(ml);
    let percentageToAdd = ml / dailyGoal * 100;
    if (initial) {
        currentProgress = percentageToAdd;
    } else {
        currentProgress += percentageToAdd;
        socket.emit('new-logging', {'amount': ml})
    }
    updateView(currentProgress);

};

const updateView = function (progress) {
    let height = progress <= 100 ? 10 + (100 - progress) / 100 * 75 : 10;
    document.querySelector('.js-waves').style.webkitTransform = `translateY(${height}%)`;
    document.querySelector('.js-waves').style.transform = `translateY(${height}%)`;
    percentage.innerHTML = Math.round(progress);
};

const listenToUI = function () {
    const amounts = document.querySelectorAll('.js-water-amount');
    for (let amount of amounts) {
        amount.addEventListener('change', function () {
            const ml = amount.getAttribute('data-amount');
            addButton.setAttribute('data-amount', ml);
            addButton.querySelector('.js-log').innerHTML = ml
        })
    }
    addButton.addEventListener('click', function () {
        const ml = addButton.getAttribute('data-amount')
        logDrink(ml);
    })
};

const init = function () {
    addButton = document.querySelector('.js-log-water');
    wave = document.querySelector('.js-waves');
    percentage = document.querySelector('.js-percentage');
    listenToUI();
    enableSocketIO();
};

document.addEventListener('DOMContentLoaded', function () {
    init();
});
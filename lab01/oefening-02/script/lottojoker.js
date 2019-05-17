"use strict";

const zodiac = [
    "boogschutter",
    "kreeft",
    "leeuw",
    "maagd",
    "ram",
    "schorpioen",
    "steenbok",
    "stier",
    "tweelingen",
    "vissen",
    "waterman",
    "weegschaal"
];
const generateJoker = function (numberCount, animalCount) {
    let list = [];
    for (let i = 0; i < numberCount; i++) {
        list.push(randomNumber(9));
    }
    for (let i = 0; i < animalCount; i++) {
        list.push(zodiac[randomNumber(11)]);
    }
    return list;
};
const showWinningNumbers = function (jokerArray) {
    let htmlText = "";
    for (const iterator of jokerArray) {
        if (typeof iterator === "number") {
            htmlText += `<div>${iterator}</div>`;
        } else {
            htmlText += `<div><img src="images/zodiac/${iterator}.png"></div>`;
        }
    }
    return htmlText;
};
const randomNumber = function (max) {
    return Math.floor(Math.random() * Math.floor(max + 1));
};
const init = function () {
    document.querySelector(".js-result").innerHTML = showWinningNumbers(
        generateJoker(5, 1)
    );
};
init();

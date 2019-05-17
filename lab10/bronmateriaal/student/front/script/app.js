const IP = '127.0.0.1:5000';
const socket = io.connect(IP);

let currentPartijLijstNr; // is geen DOM reference maar globale variabele
//#region ***********  DOM references ***********
let domKieskring, domPartijen;
//#endregion

//#region ***********  Callback - HTML Generation (After select) ***********
// show________

//#endregion

//#region ***********  Callback - (After update/delete/insert) ***********
// callback______

//#endregion
//#region ***********  Data Access ***********
// get_______

//#endregion

//#region ***********  Event Listeners ***********
// listenTo________________

//#endregion

//#region ***********  INIT / DOMContentLoaded ***********
const init = function () {
    // Get some DOM, we created empty earlier.
    domKieskring = document.querySelector('#kieskring');
    domPartijen = document.querySelector('.c-partijen');

    if (domKieskring) {
        getKieskringen();
    }
};

document.addEventListener('DOMContentLoaded', init);
//#endregion

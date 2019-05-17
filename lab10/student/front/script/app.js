const IP = '127.0.0.1:5000';
const socket = io.connect(IP);

let currentPartijLijstNr; // is geen DOM reference maar globale variabele
//#region ***********  DOM references ***********
let domKieskring, domPartijen;
let published;
//#endregion

//#region ***********  Callback - HTML Generation (After select) ***********
// show________
const showKieskringen = function (json) {
    let stroptions = '';
    if (json.error) return;
    for (let kring of json) {
        stroptions += `<option value="${kring.kieskring}">${kring.kieskring}</option>`;
    }
    document.querySelector('#kieskring').innerHTML = stroptions;
    getPartijen(domKieskring.value);
}

const showPartij = function (json) {
    let partijlijst = '';
    let partijCount = 0;
    for (let partij of json) {
        partijCount += partij.stemcijfer;
    }
    for (let partij of json) {
        currentPartijLijstNr = partij.lijstnr;
        procent = Math.round(partij.stemcijfer / partijCount * 100);
        partijlijst += `<div class="c-partij ${partij.kleur}" id="lijst_${partij.lijstnr}">
            <div class="c-partij__lijst">
              <p class="c-partij__name js-partij" data-lijstnr="${partij.lijstnr}">${partij.lijst}</p>
            </div>
            <div class="c-partij__aantal_stemmen">
              <p>${partij.stemcijfer}</p>
            </div>
            <div class="c-partij__verkozenen js-partij__verkozenen">
              <ul class="o-list">
              
              </ul>
            </div>
          </div>
<div class="c-partij ${partij.kleur}" style="width: ${procent}%">
  <p>${procent}%</p></div>`;
    }
    domPartijen.innerHTML = partijlijst;
    listenToPartijClick();
}
const showPartijleden = function (json) {
    let str = '';
    for (let partij of domPartijen.children) {
        if (partij.id)
            partij.querySelector('.o-list').innerHTML = '';
    }
    json.sort(function (x, y) {
        if (x.verkozen) {
            return -1;
        } else {
            return 1;
        }
    })
    for (let leden of json) {
        str += `<li class="${leden.verkozen ? 'verkozen' : 'niet_verkozen'}">${leden.naam_stembiljet} (${leden.naamstemmen})</li>`;
    }

    document.querySelector(`#lijst_${currentPartijLijstNr} .o-list`).innerHTML = str;
}
const showToggleStatus = function () {
    if (published) {
        domKieskring.disabled = false;
        if (domKieskring.value) {
            getPartijen(domKieskring.value);
        }
    } else {
        domKieskring.disabled = true;
        domPartijen.innerHTML = '';
    }
}

//<li class="verkozen">RONSE Axel (1660)</li>
//                 <li class="niet_verkozen">SUSTRONCK Peter (795)</li>

//#endregion

//#region ***********  Callback - (After update/delete/insert) ***********
// callback______

//#endregion
//#region ***********  Data Access ***********
// get_______
const getPartijleden = function (partij) {
    let val = domKieskring.value;
    handleData(`http://127.0.0.1:5000/api/v1/kieskring/${val}/partij/${partij}/verkozen`, showPartijleden);
}
const getPartijen = function (kieskring) {
    handleData(`http://127.0.0.1:5000/api/v1/kieskring/${kieskring}/partijen`, showPartij);
}
const getKieskringen = function () {
    handleData('http://127.0.0.1:5000/api/v1/kieskringen', showKieskringen)
}

//#endregion

//#region ***********  Event Listeners ***********
// listenTo________________
const listenToKieskring = function () {
    domKieskring.addEventListener('input', function (el) {
        getPartijen(el.target.value);
    })
}
const listenToPartijClick = function () {
    for (let partij of domPartijen.children) {
        if (partij.id) {
            let lijstnr = partij.querySelector('.js-partij').getAttribute('data-lijstnr');
            partij.addEventListener('click', function (el) {
                getPartijleden(partij.querySelector('.js-partij').innerHTML);
                currentPartijLijstNr = lijstnr;
            })
        }
    }

}
const listenToToggle = function () {

}
//#endregion

//#region ***********  INIT / DOMContentLoaded ***********
const init = function () {
    // Get some DOM, we created empty earlier.
    domKieskring = document.querySelector('#kieskring');
    domPartijen = document.querySelector('.c-partijen');

    if (domKieskring) {
        getKieskringen();
    }
    listenToKieskring();
    listenToToggle();
    socket.on('connect', function (data) {
        if (data) {
            published = data.toggle;
            showToggleStatus();
        }
    })
    socket.on('haha', function () {
        published = !published;
        showToggleStatus();
    })
};

document.addEventListener('DOMContentLoaded', init);
//#endregion

let currentDestinationID; // is geen DOM reference maar globale variabele

//#region ***********  DOM references ***********
let domDestinationHolder, domRouteHolder, domSelectedCity, domDestinationSelect;

//#endregion

//#region ***********  Callback - HTML Generation (After select) ***********
// show________
const showPossibleDestinations = function (data) {
    let toInsert = '';
    let toInsertTwo = '';
    for (let destination of data) {
        toInsert += `<li class="c-sidebar-item"><button class="c-sidebar-button js-station" data-destination-id="${destination.idbestemming}">${destination.stad}</button></li>`;
        toInsertTwo += `<option value="${destination.idbestemming}" >${destination.stad}</option>`
    }
    document.querySelector('.js-destination').innerHTML = toInsertTwo;
    domDestinationHolder.innerHTML = toInsert;

    listenToTraject();
    listenToAddTrain();
}
const showSpecificDestinations = function (data) {
    let toInsert = '';
    document.querySelector('.js-departure').innerHTML = data[0].stad;
    for (let trein of data) {
        toInsert += `<div class="c-traject">
					<div class="c-traject__info">
						<h2 class="c-traject__name">${trein.stad}</h2>
						<p class="c-traject__train-id">Trein ${trein.idtrein}</p>
					</div>
					<div class="c-traject__departure">
						${trein.vertrek}
					</div>
					<div class="c-traject__track">
						${trein.spoor}
					</div>
					<div class="c-traject__delay">
						${trein.vertraging !== null ? trein.vertraging : ''}
					</div>
					<div class="c-traject__cancelled">
					${parseInt(trein.afgeschaft) ? '<span class="c-traject__cancelled-label">cancelled</span>' : ''}
					</div>
					<div class="c-traject__update">
						<svg class="c-traject__update-symbol" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
							stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs">
							<polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon>
						</svg>
					</div>
					<div class="c-traject__delete" data-train-id="${trein.idtrein}">
						<svg class="c-traject__delete-symbol" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
							stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs">
							<polyline points="3 6 5 6 21 6"></polyline>
							<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
							<line x1="10" y1="11" x2="10" y2="17"></line>
							<line x1="14" y1="11" x2="14" y2="17"></line>
						</svg>
					</div>
				</div>`
    }
    domRouteHolder.innerHTML = toInsert;
    listenToDeleteButtons();
}

const showDestinations = function (data) {
    let toInsert = '';
    for (let trein of data) {
        toInsert += `<div class="c-traject">
					<div class="c-traject__info">
						<h2 class="c-traject__name">${trein.stad}</h2>
						<p class="c-traject__train-id">Trein ${trein.idtrein}</p>
					</div>
					<div class="c-traject__departure">
						${trein.vertrek}
					</div>
					<div class="c-traject__track">
						${trein.spoor}
					</div>
					<div class="c-traject__delay">
						${trein.vertraging !== null ? trein.vertraging : ''}
					</div>
					<div class="c-traject__cancelled">
					${parseInt(trein.afgeschaft) ? '<span class="c-traject__cancelled-label">cancelled</span>' : ''}
					</div>
					<div class="c-traject__update">
						<svg class="c-traject__update-symbol" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
							stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs">
							<polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon>
						</svg>
					</div>
					<div class="c-traject__delete" data-train-id="${trein.idtrein}">
						<svg class="c-traject__delete-symbol" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
							stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs">
							<polyline points="3 6 5 6 21 6"></polyline>
							<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
							<line x1="10" y1="11" x2="10" y2="17"></line>
							<line x1="14" y1="11" x2="14" y2="17"></line>
						</svg>
					</div>
				</div>`
    }
    domRouteHolder.innerHTML = toInsert;
    listenToDeleteButtons();
}
//#endregion

//#region ***********  Callback - (After update/delete/insert) ***********
// callback______

//#endregion

//#region ***********  Data Access ***********
// get_______
const getAllDestinations = function () {
    handleData(`http://127.0.0.1:5000/api/v1/treinen`, showDestinations);
}
const getCurrentDestination = function () {
    handleData(`http://127.0.0.1:5000/api/v1/treinen/bestemmingen/${currentDestinationID}`, showSpecificDestinations);
}
const getPossibleDestinations = function () {
    handleData(`http://localhost:5000/api/v1/bestemmingen`, showPossibleDestinations);
}
//#endregion

//#region ***********  Event Listeners ***********
// listenTo________________
const listenToTraject = function () {
    let children = document.querySelectorAll('.js-station');
    for (let child of children) {
        child.addEventListener('click', function () {
            currentDestinationID = child.getAttribute('data-destination-id');
            getCurrentDestination();
        })
    }
}
const listenToAddTrain = function () {
    document.querySelector('#btn_add_train').addEventListener('click', function () {
        currentDestinationID = parseInt(document.querySelector('.js-destination').value);
        const data = {
            bestemmingID: parseInt(document.querySelector('.js-destination').value),
            vertrek: document.querySelector('#add_vertrek').value,
            spoor: parseInt(document.querySelector('#add_spoor').value),
            vertraging: parseInt(document.querySelector('#add_vertraging').value),
            afgeschaft: document.querySelector('#add_afgeschaft').value !== 'on' ? 0 : 1
        };
        console.log(data);
        handleData('http://localhost:5000/api/v1/treinen', getCurrentDestination, 'POST', JSON.stringify(data));
    })
}
const listenToDeleteButtons = function () {
    let children = document.querySelectorAll('.c-traject__delete');
    for (let child of children) {
        child.addEventListener('click', function (el) {
            let trajectid = parseInt(this.getAttribute('data-train-id'));
            handleData(`http://localhost:5000/api/v1/treinen/${trajectid}`, currentDestinationID === (null || undefined) ? getAllDestinations : getCurrentDestination, 'DELETE')
        })
    }

}

//#endregion

//#region ***********  INIT / DOMContentLoaded ***********
const init = function () {
    console.log('🚂', 'https://www.youtube.com/watch?v=8oVTXSntnA0');

    // Get some DOM, we created empty earlier.
    domDestinationHolder = document.querySelector('.js-destinations');
    domRouteHolder = document.querySelector('.js-trajects');
    domSelectedCity = document.querySelector('.js-departure');
    domDestinationSelect = document.querySelector('.js-destination');

    getPossibleDestinations();
    getAllDestinations();
};

document.addEventListener('DOMContentLoaded', init);
//#endregion

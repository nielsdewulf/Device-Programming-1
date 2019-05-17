'use strict';

const verwijderKlant = function (jsonObject) {
    console.log(jsonObject);
    document.querySelector('#result').innerHTML = `${jsonObject.message}`;
};
const listenDelete = function () {
    const id = new URLSearchParams(window.location.search).get('id');
    handleData(`http://127.0.0.1:5000/api/v1/klanten/${id}`, verwijderKlant, 'DELETE');
};
const init = function () {
    document.querySelector('#delete').addEventListener('click', listenDelete);
};

document.addEventListener('DOMContentLoaded', function () {
    console.info('DOM geladen');
    init();
});

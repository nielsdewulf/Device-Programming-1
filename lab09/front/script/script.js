// #region Algemeen
//const IP = prompt('geef publiek IP', 'http://127.0.0.1:5000');
const IP = window.location.hostname + 'http://169.254.10.1:5000';
const socket = io.connect('http://172.30.252.25:5000');
let toggleValue;
const toggle = function () {
    socket.emit('knop', {'value': !toggleValue});
    toggleValue = !toggleValue;
    showToggle()
};
const showToggle = function () {
    if (toggleValue) {
        document.querySelector('.fancy-bulb').classList.add('active')
    } else {
        document.querySelector('.fancy-bulb').classList.remove('active')
    }
}

const init = function () {
    socket.on('connected', function (data) {
        toggleValue = data.value;
        showToggle()
    });
    socket.on('toggle', function (data) {
        console.log(data.value);
        toggleValue = data.value;
        showToggle()
    });
    document.querySelector('.power').addEventListener('click', toggle);
};

document.addEventListener('DOMContentLoaded', function () {
    console.info('DOM geladen');
    init();
});

// #endregion

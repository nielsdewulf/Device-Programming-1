const IP = '127.0.0.1:5000';
const socket = io.connect(IP);

const listenToToggle = function () {
    document.querySelector('.js-chk').addEventListener('input', function (el) {
        socket.emit('toggle');
        document.querySelector('.js-chk').checked = !document.querySelector('.js-chk').checked;
        el.preventDefault();
    })
    socket.on('connect', function (data) {
        if (data) {
            document.querySelector('.js-chk').checked = data.toggle;
            console.log(data)
        }
    })
    socket.on('haha', function () {
        document.querySelector('.js-chk').checked = !document.querySelector('.js-chk').checked;
        console.log(!document.querySelector('.js-chk').checked)
    })
}

const init = function () {
    const chk = document.querySelector('.js-chk');
    listenToToggle();
};

document.addEventListener('DOMContentLoaded', init);

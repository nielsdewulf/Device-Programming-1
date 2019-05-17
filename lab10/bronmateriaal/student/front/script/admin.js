const IP = '127.0.0.1:5000';
const socket = io.connect(IP);

const init = function () {
    const chk = document.querySelector('.js-chk');
};

document.addEventListener('DOMContentLoaded', init);

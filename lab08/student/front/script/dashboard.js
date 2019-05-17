'use strict';
const lanIP = '127.0.0.1';
let socket, lastdate = '', table, chart;
let labels = [];
let dataarray = [];

const initSocketConnection = function () {
    socket = io(`http://${lanIP}:5000`);
    socket.on('newLogging', function (data) {
            let header = document.querySelectorAll('.is-header');
            let date = new Date();

            table.innerHTML += addRow(data, date);

            let hour_string = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}u`
            let date_string = `${date.getDay().toString().padStart(2, '0')} / ${(date.getMonth() + 1).toString().padStart(2, '0')} / ${date.getFullYear().toString().padStart(4, '0')}`;

            chart.data.labels.push(`${date_string} ${hour_string}`);
            chart.data.datasets.forEach((dataset) => {
                dataset.data.push(data.amount);
            });
            chart.update();

        }
    )
}

const addRow = function (row, date) {
    let date_string = `${date.getDay().toString().padStart(2, '0')} / ${(date.getMonth() + 1).toString().padStart(2, '0')} / ${date.getFullYear().toString().padStart(4, '0')}`;
    let header = `<div class="c-row is-header">
            <div class="c-cell">${date_string}</div>
        </div>`;
    let rw = `<div class="c-row">
            <div class="c-cell">${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}u</div>
            <div class="c-cell">${row.amount}ml</div>
        </div>`;
    console.log(date_string, lastdate);
    if (date_string === lastdate) {
        return rw;
    } else {
        lastdate = date_string;
        return header + rw;
    }

};

const showTableData = function (data) {
    let str = '';
    for (let rw of data) {
        let date = new Date(rw.date);
        str += addRow(rw, new Date(date));

        let hour_string = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}u`
        let date_string = `${date.getDay().toString().padStart(2, '0')} / ${(date.getMonth() + 1).toString().padStart(2, '0')} / ${date.getFullYear().toString().padStart(4, '0')}`;

        labels.push(`${date_string} ${hour_string}`);
        dataarray.push(rw.amount);
    }
    table.innerHTML = str;
};

const getTableData = function () {
    handleData('http://localhost:5000/api/v1/amounts', showTableData)
};

const loadGraph = function () {
    var ctx = document.getElementById('waterData').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Water consumption (ml)',
                data: dataarray,
                backgroundColor: [
                    'transparent'
                ],
                borderColor: [
                    'rgba(255, 0, 0, 1)'
                ],
                pointBackgroundColor: 'white'
            }]
        },

    });
}

const init = function () {
    table = document.querySelector('.js-table');
    getTableData();
    initSocketConnection();
    loadGraph();
};

document.addEventListener('DOMContentLoaded', function () {
    init();
});
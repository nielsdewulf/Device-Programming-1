'use strict';

const loadGraph = function (jsondata) {
    const labels = [];
    const data = [];
    for (const el of jsondata) {
        labels.push(el.unit);
        data.push(el.price);
    }
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'iPhone',
                data: data,
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
document.addEventListener('DOMContentLoaded', function () {
    console.info('DOM geladen');
    handleData("iphone.json", loadGraph);
});

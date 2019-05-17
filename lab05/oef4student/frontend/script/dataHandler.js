const maakTabelTitels = function (headers) {
    let HTML = '<tr>';
    for (const header of headers) {
        HTML += `<th>${header}</th>`;
    }
    HTML += `<th>UPDATE</th>`;
    HTML += `<th>DELETE</th>`;

    HTML += '<tr>';
    return HTML;
};

const maakTabelRij = function (items, id) {
    let HTML = '<tr>';
    for (const item of items) {
        HTML += `<td>${item}</td>`;
    }
    HTML += `<td align="center"><a href="update.html?id=${id}">Update</a></td>`;
    HTML += `<td align="center"><a href="delete.html?id=${id}">Delete</a></td>`;
    HTML += '</tr>';
    return HTML;
};

const maakTabel = function (jsonObject, ID) {
    let HTML = '<table>';
    HTML += maakTabelTitels(Object.keys(jsonObject[0]));
    for (const i in jsonObject) {
        const id = jsonObject[i][ID];
        HTML += maakTabelRij(Object.values(jsonObject[i]), id);
    }
    HTML += '</table>';

    return HTML;
};

const handleData = function (url, callback, method = 'GET', body = null) {
    fetch(url, {method: method, body: body, headers: {'content-type': 'application/json'}})
        .then(function (response) {
            if (!response.ok) {
                throw Error(`Probleem bij de fetch(). Status Code: ${response.status}`);
            } else {
                console.info('Er is een response teruggekomen van de server');
                return response.json();
            }
        })
        .then(function (jsonObject) {
            console.info('json object is aangemaakt');
            console.info('verwerken data');
            /* CALLBACK TOEVOEGEN */
            callback(jsonObject);
        })
        .catch(function (error) {
            console.error(`fout bij verwerken json ${error}`);
        });
};

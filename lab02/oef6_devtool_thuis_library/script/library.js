'use strict';

const laadBoeken = function () {
    fetch('http://openlibrary.org/search.json?q=keuken')
        .then(function (response) {
            if (!response.ok) {
                throw Error(
                    `Looks like there was a problem. Status Code: ${response.status}`
                );
            } else {
                return response.json();
            }
        })
        .then(function (jsonObject) {
            verwerkboeken(jsonObject);
        })
        .catch(function (error) {
            console.error(`fout bij verwerken json ${error}`);
        });
};

const verwerkboeken = function (jsonObject) {
    console.log(`aantal gevonden boeken ${jsonObject.num_found}`)
    for (let boek of jsonObject.docs) {
        console.log('##########################')
        console.log(`Title ondertitel ${boek.title_suggest}`);
        console.log(`Geschreven door ${boek.author_name}`);
        if (boek.subject !== (null || undefined)) {
            console.log('Boek gaat over');
            for (let onderwerk of boek.subject) {
                console.log(`-> ${onderwerk}`);
            }
        }

    }
};

document.addEventListener('DOMContentLoaded', function () {
    laadBoeken();
});

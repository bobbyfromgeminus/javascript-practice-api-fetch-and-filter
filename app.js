'use strict';

// DEKLARÁCIÓK _______________________________________________________________________________________________________________________________________________________

    const userTableBody = document.querySelector('tbody');              // felhasználók táblázatát befoglaló tbody
    const search = document.getElementById('search');                   // kereső input mező
    const showUsersButton = document.querySelector('button');           // adatokat lekérdező gomb
    const apiURL = 'https://jsonplaceholder.typicode.com/users';        // API url

    let usersArray = [];                                                // adatokat tároló tömb változó (kezdő értéke üres tömb)


// USEREK LEKÉRÉSE API-TÓL ___________________________________________________________________________________________________________________________________________

    const getUsersFetch = () => {
        fetch(apiURL)                                                   // meghívjuk az API users lábát, lekérve a user adatokat json formátumban
        .then(response => response.json())
        .then(data => {
            usersArray = data;                                          // a kapott json-t átadjuk a 9. sorban létrehozott üres tömbnek (későbbiekben ezzel dolgozunk)
        });
    }

    const getUsersAjax = () => {
        $.ajax({
            url: apiURL,
            method: "GET",
            dataType: "json",
            success: function(response) {
                usersArray = response; 
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        });
    }
      


// TÁBLÁZAT ELEMEINEK ÖSSZEÁLLÍTÁSA __________________________________________________________________________________________________________________________________

    // Táblázat sor készítése (egyetlen userből készít egyetlen sort a táblázathoz)

        const createTableRow = (user) => {
            const tableRow = ` <tr>
                                    <td>${user.id}</td>
                                    <td>${user.name}</td>
                                    <td>${user.username}</td>
                                    <td>${user.email}</td>
                                </tr>
                            `;
            return tableRow;
        }

    // 4. Teljes táblázat összeállítása (a három részelemből összeállítja a teljes táblázatot)

        const createTableBody = (users) => {
            let tableBody = ``;                                         // létrehozunk egy üres stringet

            users.forEach(user => {                                     // bejárjuk a usereket tartalmazó json tömbünket
                tableBody += createTableRow(user);                      // userenként meghívjuk a táblázat-törzs generáló függvényt és a korábbi üres stringbe nyomkodjuk userenként (+=)
            });
                
                                                                        // összepakoljuk a részegységekből a teljes táblázatot
            userTableBody.innerHTML = tableBody;                        // átadjuk a tbodynak

        }


// SZŰRÉS KERESŐSZÓRA ________________________________________________________________________________________________________________________________________________

    const searchUsersByName = () => {
        const searchString = search.value.toLowerCase();                // a keresőmező aktuális értékét kisbetűsítem
        const resultArray = usersArray
                                .filter( item =>                        // a teljes user tömbben keresek filterrel...
                                            item.name.toLowerCase()     // a callback függvényben kisbetűsítem a tömb elem (egy user) name tulajdonságát...
                                            .includes(searchString) );  // majd kigyűjtöm azokat, amelyekben megtalálható a kisbetűsített keresőszó
                                            
        createTableBody(resultArray);                                   // újrageneráltatom a táblázatot de már nem a teljes user tömbbel, hanem a szűrt résztömbbel
    }


// ESEMÉNYKEZELŐK ____________________________________________________________________________________________________________________________________________________

    // User-lista generáló gomb megnyomása
    showUsersButton.addEventListener('click', () => {                   // az adatlekérő gomb kattintás eseményét figyeljük
                                        createTableBody(usersArray)     // a táblageneráló függvényt adjuk át neki, de mivel ez a függvény paramétert vár (ki kell tenni a kerek zárójelet)
                                    });                                 // ezért becsomagoltuk egy paraméter nélküli függvénybe, így nem hívódik meg azonnal, csak a kattintásra

    // Keresőmezőn történő billantyűfelengedés
    search.addEventListener('keyup', searchUsersByName);                // a keresőmezőn történő billentyű felengedést figyeljük és a kereső függvényt adjuk át neki műveletként


// USEREK TÉNYLEGES LEKÉRÉSE API-TÓL _________________________________________________________________________________________________________________________________


// meghívjuk az adatlekérő függvényt, ami az API-tól lekéri a usereket és elmenti egy változóba (usersArray)
getUsersFetch();
//getUsersAjax();
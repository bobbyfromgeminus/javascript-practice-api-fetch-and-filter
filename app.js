'use strict';

// DEKLARÁCIÓK _______________________________________________________________________________________________________________________________________________________

    const userTableContainer = document.getElementById('user-list');    // felhasználók táblázatát befoglaló konténer div
    const search = document.getElementById('search');                   // kereső input mező
    const showUsersButton = document.querySelector('button');           // adatokat lekérdező gomb

    let usersArray = [];                                                // adatokat tároló tömb változó (kezdő értéke üres tömb)


// USEREK LEKÉRÉSE API-TÓL ___________________________________________________________________________________________________________________________________________

    const getUsers = () => {
        fetch('https://jsonplaceholder.typicode.com/users')             // meghívjuk az API users lábát, lekérve a user adatokat json formátumban
        .then(response => response.json())
        .then(data => {
            usersArray = data;                                          // a kapott json-t átadjuk a 9. sorban létrehozott üres tömbnek (későbbiekben ezzel dolgozunk)
        });
    }


// TÁBLÁZAT ELEMEINEK ÖSSZEÁLLÍTÁSA __________________________________________________________________________________________________________________________________

    // 1. Táblázat fejléc készítése (a tábla nyitó elemét, a fejlécét és a törzs nyitó elemét tartalmazza)

        const createTableHeader = () => {
            const tableHeader = `   <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">UserName</th>
                                                <th scope="col">e-mail</th>
                                            </tr>
                                        </thead>
                                    <tbody>`;
            return tableHeader;
        }


    // 2. Táblázat lábléc készítése (a táblázat törzsének záró és a táblázat záró elemét tartalmazza)

        const createTableFooter = () => {
            const tableFooter = `</tbody></table>`;
            return tableFooter;
        }


    // 3. Táblázat sor készítése (egyetlen userből készít egyetlen sort a táblázathoz)

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

        const createFullTable = (users) => {
            let tableBody = ``;                                         // létrehozunk egy üres stringet

            users.forEach(user => {                                     // bejárjuk a usereket tartalmazó json tömbünket
                tableBody += createTableRow(user);                      // userenként meghívjuk a táblázat-törzs generáló függvényt és a korábbi üres stringbe nyomkodjuk userenként (+=)
            });
                
                                                                        // összepakoljuk a részegységekből a teljes táblázatot
            userTableContainer.innerHTML = createTableHeader()          // a fejlécet
                                            + tableBody                 // a tábla-törzset
                                            + createTableFooter();      // a látlécet

        }


// SZŰRÉS KERESŐSZÓRA ________________________________________________________________________________________________________________________________________________

    const searchUsersByName = () => {
        const searchString = search.value.toLowerCase();                // a keresőmező aktuális értékét kisbetűsítem
        const resultArray = usersArray
                                .filter( item =>                        // a teljes user tömbben keresek filterrel...
                                            item.name.toLowerCase()     // a callback függvényben kisbetűsítem a tömb elem (egy user) name tulajdonságát...
                                            .includes(searchString) );  // majd kigyűjtöm azokat, amelyekben megtalálható a kisbetűsített keresőszó
                                            
        createFullTable(resultArray);                                   // újrageneráltatom a táblázatot de már nem a teljes user tömbbel, hanem a szűrt résztömbbel
    }


// ESEMÉNYKEZELŐK ____________________________________________________________________________________________________________________________________________________

    // User-lista generáló gomb megnyomása
    showUsersButton.addEventListener('click', () => {                   // az adatlekérő gomb kattintás eseményét figyeljük
                                        createFullTable(usersArray)     // a táblageneráló függvényt adjuk át neki, de mivel ez a függvény paramétert vár (ki kell tenni a kerek zárójelet)
                                    });                                 // ezért becsomagoltuk egy paraméter nélküli függvénybe, így nem hívódik meg azonnal, csak a kattintásra

    // Keresőmezőn történő billantyűfelengedés
    search.addEventListener('keyup', searchUsersByName);                // a keresőmezőn történő billentyű felengedést figyeljük és a kereső függvényt adjuk át neki műveletként


// USEREK TÉNYLEGES LEKÉRÉSE API-TÓL _________________________________________________________________________________________________________________________________

    getUsers();                                                         // meghívjuk az adatlekérő függvényt, ami az API-tól lekéri a usereket és elmenti egy változóba (usersArray)
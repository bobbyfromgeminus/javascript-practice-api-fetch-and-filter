# Javascript gyakorlás - API hívás fetch-csel és a filter metódus alkalmazása

- Ebben a feladatban a jsonplaceholder API users lábát hívjuk meg fetch segítésével.
- Kapunk 10 db usert JSON formátumban.
- A kapott adatokból a gomb megnyomásával egy táblázatot generálunk
- A keresőmezőbe írt szó meglétét vizsgáljuk a userek name tulajdonságában
- A keresőmezőbe történő beírással újrageneráljuk a táblázatot a feltételnek megfelelő userekből

A későbbi fejlesztéshez segítség a kapott user objektum szerkezete:

```
{
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
        }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
    }
}
```
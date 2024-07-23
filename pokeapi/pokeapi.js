let info = document.getElementById("pokemoname");


    document.getElementById("pokemonFetch").addEventListener("click", () =>
    {
    let PokemonName = info.value.toLowerCase();
        fetch(`https://pokeapi.co/api/v2/pokemon/${info.value}`)
    .then((req) => req.json())
    .then (poki)
    .catch(error => {alert("Pardona, no tengo esta CARAMBA!")})
    }
    )

    function poki(obJson)
    {
        let name = obJson["forms"]["0"]["name"];
        let img = obJson["sprites"]["front_default"];
        
        let imia = document.getElementById("pokemonInfo");
        imia.innerHTML = `${name}`;
        let image = document.getElementById("pocemon_img");
        image.src = `${img}`;
        console.log(name, img)
    }
// const types = [
//     { slot: 1,  type: {name:  "grass", url: "https://pokeapi.co/api/v2/type/12/"}},
//     { slot: 2,  type: {name: "poison", url: "https://pokeapi.co/api/v2/type/4/"}},
//  ];
// console.log(types.map(v => v.type.name)) // v stands for variable
const $Search = $('.search')

$Search.on('submit', (event) => {
    // stop the page from reloading
    event.preventDefault();

    // declare constants for jquery
    //// generate the form data from the submission on click
    const formData = new FormData(event.target)
    console.log(formData)

    //// grab the name of the pokemon from submit 'pokemon'
    const pokemon = formData.get('pokémon')
    console.log(pokemon)
    //// connect to the api 
    const pokeapi = `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`
    const $screen = $(".screen");
    const $result = $(".result");

    // clear previous results
    $screen.empty();
    $result.empty();
    $result.html(`<div>Loading...</div>`)
    fetch(pokeapi)
        .then(response => {
            return response.json();
        })
        .then(data => {$screen.html(`<img src=${data.sprites.front_default} alt=${data.name}>`
        );
        $result.html(`
            <div>
                <b>name:&nbsp;</b>${data.name}
            </div>
            <div>
                <b>id:&nbsp;</b>${data.id}
            </div>
            <div>
                <b>weight:&nbsp;</b>${data.weight}
            </div>
            <div>
                <b>types:&nbsp;</b>${data.types.map(v => v.type.name)}
            </div>
        `)})
    .catch(() => {
        $result.html('<div>There was an error...</div>')
    });
        
})
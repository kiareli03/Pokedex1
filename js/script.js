const pokemonName = document.querySelector(".pokemon_name");
const pokemonNumber = document.querySelector(".pokemon_number");
const pokemonImage = document.querySelector(".pokemon_image");

const form = document.querySelector(".form");
const input = document.querySelector(".input_search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
};

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = "loading...";
    pokemonNumber.innerHTML = "";

    const data = await fetchPokemon(pokemon);

    if (data && data.id < 650) {
        pokemonImage.style.display = "block";
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src =
            data["sprites"]["versions"]["generation-v"]["black-white"][
                "animated"
            ]["front_default"];

        input.value = "";
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = "none";
        pokemonName.innerHTML = "Not found :c";
        pokemonNumber.innerHTML = "";
        input.value = "";
    }

    if (data.id >= 650) {
        alert(
            "Esta pokédex só tem pokemons até a Geração-V/Black-White\n Total pokemons: 649"
        );
    }
};

form.addEventListener("submit", (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});
buttonNext.addEventListener("click", () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);

/* a const fetchPokemon é uma função de busca das informações do pokemon com o mesmo nome informado no parametro, a const APIResponse seria a resposta da API ou seja o resultado, no fetch é passado o endpoint no caso a url da API 
alem disso como fetch é assincrono tipo uma promisse(promessa) ou seja que não sabemos quanto tempo vai demorar para responder, e como o assincrono não espera a resposta do fetch para ser feita a promisse, devemos criar um metodo que espere a resposta do fetch usando o "await" ou seja no final isso diz que nossa função ira buscar dados daquele nome pokemon no argumento e retornar pelo fetch mas que o fetch sendo assincrono e retornando uma promisse deve esperar o resultado chegar antes de entregar algo*/

const pokemonName = document.querySelector(".pokemon_name");
const pokemonNumber = document.querySelector(".pokemon_number");
const pokemonImage = document.querySelector(".pokemon_image");

const form = document.querySelector(".form");
const input = document.querySelector(".input_search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

let searchPokemon = 1;

/* ----------------------------------------------------------------------------- ESTA FUNÇÃO FAZ A BUSCA DE INFORMAÇÕES NA API, QUE PODE SER PESQUISADA TANTO POR NOME OU ID DO POKEMON NO PARAMENTRO DA FUNÇÃO
POR FETCH SER ASSINCRONO E UMA PROMISSE OU SEJA NÃO SABEMOS QUANDO IRA RETORNA A RESPOSTA DA API, UTILIZAMOS O AWAIT PARA QUE O O FETCH ESPERE RETORNAR A BUSCA NA API  */

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}` // ${} TEMPLATE LITERALS
    );
    if (APIResponse.status === 200) {
        /* AQUI ESTE IF INDICA QUE O JSON DA API SÓ SERA RETORNADO SE A BUSCA DA API RETORNAR STATUS 200*/
        const data = await APIResponse.json();
        return data;
    }
};

/* ---------------------------------------------------------------------------- ESTA FUNÇÃO FAZ A RENDERIZAÇÃO DAS INFORMAÇÕES RETORNADAS PELA API NA FUNÇÃO FETCH, COMO IMAGEM, NOME E ID DO POKEMON, ELA TAMBEM É ASSINCRONA (PROMISSE)*/

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML =
        "loading..."; /*MENSAGEM DE LOADING ANTES DA CHAMADA DA API*/
    pokemonNumber.innerHTML = "";

    const data = await fetchPokemon(pokemon);

    if (data && data.id < 650) {
        /* CONDIÇÃO DE RENDERIZAÇÃO PARA RENDERIZAR O NOME,ID E IMAGEM DO POKEMON SE HOUVER DATA(DADOS) DA API E SE O ID FOR MENOR QUE 650, POIS AS IMAGENS BUSCADAS NA API SÃO APENAS ATÉ A GERAÇÃO 5 DO POKEMON  QUE TEM APENAS 649 POKEMONS TOTAIS */
        pokemonImage.style.display = "block";
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src =
            data["sprites"]["versions"]["generation-v"]["black-white"][
                "animated"
            ]["front_default"];

        input.value = ""; /* LIMPA A ENTRADA DE DADOS*/
        searchPokemon = data.id; // ATUALIZA A VARIAVEL GLOBAL COM O VALOR DO ULTIMO POKEMON PESQUISADO
    } else {
        pokemonImage.style.display = "none"; // SE NÃO RETORNAR DADOS DA API EXIBIR NA TELA "NOT FOUND" E NÃO EXIBIR IMAGEM
        pokemonName.innerHTML = "Not found :c";
        pokemonNumber.innerHTML = "";
        input.value = "";
    }

    if (data.id >= 650) {
        // AQUI LIMITA A PESQUISA DE POKEMONS ATÉ O POKEMON 649
        alert(
            "Esta pokédex só tem pokemons até a Geração-V/Black-White\n Total pokemons: 649"
        );
    }
};

form.addEventListener("submit", (event) => {
    // ENVIA O VALOR DIGITADO NO INPUT PARA O PARAMETRO DO RENDERPOKEMON, O TOLOWERCASE FAZ COM QUE TODAS AS LETRAS SEJAM TRANSFORMADAS EM MINUSCULAS
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
    // FAZ A AÇÃO DE PUXAR O POKEMON ANTERIOR
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});
buttonNext.addEventListener("click", () => {
    // FAZ A AÇÃO DE PUXAR O POKEMON SUCESSOR
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);

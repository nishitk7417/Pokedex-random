const api = 'https://pokeapi.co/api/v2/pokemon';
const speciesApi = 'https://pokeapi.co/api/v2/pokemon-species';

const typesColor = {
    water: "#6493EB",
    grass: "#74CB48",
    fire: "#F57D31",
    bug: "#A7B723",
    dark: "#75574C",
    electric: "#F9CF30", 
    ghost: "#70559B",
    normal: "#AAA67F",
    poison: "#A43E9E",
    psychic: "#FB5584",
    steel: "#B7B9D0", 
    dragon: "#7037FF",
    fairy: "#E69EAC",
    fighting: "#C12239",
    flying: "#A891EC",
    ground: "#DEC16B",
    ice: "#9AD6DF",
    rock: "#B69E31"

}
async function fetchData() {
    const id = Math.floor(Math.random()*898)+1;
    const data = {
        id: "",
        avatar: "",
        name: "",
        types: [], 
        abilities: [],
        weight: "",
        height: "",
        about: "",
        stats: {
            hp: "",
            atk: "",
            def: "",
            spd: ""
        }
    };
     try {
        const pokemonResponse = await fetch(`${api}/${id}`);
        if(!pokemonResponse.ok){
            throw new Error('Failed to fetch Pokémon data');
        }
        const pokemonDataResponse = await pokemonResponse.json();
        data.id = pokemonDataResponse.id;
        data.avatar = pokemonDataResponse.sprites.other["official-artwork"].front_default;
        data.name = pokemonDataResponse.name;
        data.weight = pokemonDataResponse.weight;
        data.height = pokemonDataResponse.height;
        data.stats.hp = pokemonDataResponse.stats.find(stat => stat.stat.name === 'hp').base_stat;
        data.stats.atk = pokemonDataResponse.stats.find(stat => stat.stat.name === 'attack').base_stat;
        data.stats.def = pokemonDataResponse.stats.find(stat => stat.stat.name === 'defense').base_stat;
        data.stats.spd = pokemonDataResponse.stats.find(stat => stat.stat.name === 'speed').base_stat;
        pokemonDataResponse.types.forEach(ele => {
            data.types.push(ele.type.name)
        });
        pokemonDataResponse.abilities.forEach(ele => {
            data.abilities.push(ele.ability.name)
        });

        const speciesResponse = await fetch(`${speciesApi}/${id}`)
        if(!speciesResponse.ok){
            throw new Error('Failed to fetch Pokémon data');
        }
        const speciesDataResponse = await speciesResponse.json();

        const englishText = speciesDataResponse.flavor_text_entries.find(entry => entry.language.name === 'en')
        if (englishText) {
            data.about = englishText.flavor_text;
        }
        

     } catch (error) {
        console.error('Error fetching Pokémon data:', error);
     }
     return data;
};
async function renderPokemon(){
    
    const pokemonData = await fetchData();
    
    let color =''
    for(const key in typesColor){
        if(key === pokemonData.types[0]){
            color = typesColor[key]
        }
    }
    document.getElementById("main").style.display = 'block';
    document.getElementById("main").style.backgroundColor = color;
    document.getElementById("pokemonName").textContent = pokemonData.name[0].toUpperCase() + pokemonData.name.substring(1)
    document.getElementById("pokemonId").textContent = (`#0${pokemonData.id}`)
    document.getElementById("pokemonAvatar").src = pokemonData.avatar;
    const types = document.getElementById("pokeType");
    types.innerHTML ='';
    pokemonData.types.forEach(type =>{
        const pElement = document.createElement("p")
        pElement.textContent = type;
        if(typesColor[type]){
            pElement.style.backgroundColor = typesColor[type]
        } else{
            pElement.style.backgroundColor = "#AAA67F"   
        }
        types.appendChild(pElement)
    })
    document.getElementById('about').style.color = color;
    document.getElementById("pokemonWeight").textContent = pokemonData.weight;
    document.getElementById("pokemonHeight").textContent = pokemonData.height;
    const abilities = document.getElementById("pokemonMoves")
        abilities.innerHTML = ""
        pokemonData.abilities.forEach((ability) => {
            const abilityElement = document.createElement("p")
            abilityElement.textContent = ability[0].toUpperCase() + ability.substring(1)
            abilities.appendChild(abilityElement)
            
        })
    document.getElementById('pokemonAbout').textContent = pokemonData.about;
    document.getElementById('pokemonStat').style.color = color;
    document.getElementById('pokemonStatField').style.color =color;
    document.getElementById('pokemonHp').textContent = pokemonData.stats.hp;
    document.getElementById('pokemonAtk').textContent = pokemonData.stats.atk;
    document.getElementById('pokemonDef').textContent = pokemonData.stats.def;
    document.getElementById('pokemonSpd').textContent = pokemonData.stats.spd;
    document.getElementById("hpStat").style.width = `${pokemonData.stats.hp}px`;
    document.getElementById("hpStat").style.backgroundColor = color;
    document.getElementById("atkStat").style.width = `${pokemonData.stats.atk}px`;
    document.getElementById("atkStat").style.backgroundColor = color;
    document.getElementById("defStat").style.width = `${pokemonData.stats.def}px`;
    document.getElementById("defStat").style.backgroundColor = color;
    document.getElementById("spdStat").style.width = `${pokemonData.stats.spd}px`;
    document.getElementById("spdStat").style.backgroundColor = color;
    
}   
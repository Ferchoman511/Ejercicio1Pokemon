function searchPokemon() {
    var param = document.getElementById("searchInput").value.toLowerCase().trim();

    // API URL
    var apiUrl = "https://pokeapi.co/api/v2/pokemon/" + param;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById("pokemonName").textContent = data.name;
            document.getElementById("pokemonInfo").textContent = "ID: " + data.id;
            document.getElementById("pokemonCard").style.display = "block";
            console.log("datos", data);
        })
        .catch(error => console.error('Error:', error));
}

// Funcion de prueba 
function search() {
    // LImite a 150 
    var randomId = Math.floor(Math.random() * 150) + 1;
    searchPokemonById(randomId);
}

// Buscar por ID
function searchPokemonById(id) {
    
    var apiUrl = "https://pokeapi.co/api/v2/pokemon/" + id;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            //DATOS  pokémon en card 
            document.getElementById("pokemonName").textContent = data.name;
            document.getElementById("pokemonInfo").textContent = "ID: " + data.id;
            // MOSTRAR Pokémon 
            document.getElementById("pokemonCard").style.display = "block";
            console.log(data)
        })
        .catch(error => console.error('Error:', error));
}
function showDetails() {
    // Se obtiene el nombre del pokemon 
    var pokemonName = document.getElementById("pokemonName").textContent;

    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName.toLowerCase())
        .then(response => response.json())
        .then(data => {
            // Se obtienen habilidades, tipos, altura, peso 
            var abilities = data.abilities.map(ability => ability.ability.name).join(", ");
            var types = data.types.map(type => type.type.name).join(", ");
            var height = data.height;
            var weight = data.weight;
            
            // Elemento HTML
            var details = `Habilidades: ${abilities}<br>`;
            details += `Tipo(s): ${types}<br>`;
            details += `Altura: ${(height / 0.3048).toFixed(2) } m <br>`;
            details += `Peso: ${(weight / 0.45359237).toFixed(2)} kg <br>`;
            
            //Se agrega modal
            document.getElementById("pokemonDetails").innerHTML = details;
            
            // Se  muestra el modal 
            $('#pokemonModal').modal('show');
        })
        .catch(error => console.error('Error:', error));
}

// Prueba para agregar a la tabla un pokemon 
function addToTable() {
    alert("Adding Pokémon to table...");
}

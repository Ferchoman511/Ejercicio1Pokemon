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
    clean();
}

// Funcion de prueba 
function search() {
    // Limite a 150 
    var randomId = Math.floor(Math.random() * 150) + 1;
    searchPokemonById(randomId);
}

function clean (){
    document.getElementById("searchInput").value = "";
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
            var details = `<strong>Habilidades:</strong> ${abilities}<br>`;
            details += `<strong>Tipo(s):</strong> ${types}<br>`;
            details += `<strong>Altura: </strong>${(height / 0.3048).toFixed(2) } m <br>`;
            details += `<strong>Peso:</strong> ${(weight / 0.45359237).toFixed(2)} kg <br>`;
            
            //Se agrega modal
            document.getElementById("pokemonDetails").innerHTML = details;
            
            // Se  muestra el modal 
            $('#pokemonModal').modal('show');
        })
        .catch(error => console.error('Error:', error));
}

var pokemonTableData = [];

// Function para agregar el Pokémon seleccionado a la tabla
function addToTable() {
    var pokemonName = document.getElementById("pokemonName").textContent;
    var pokemonID = document.getElementById("pokemonInfo").textContent.replace("ID: ", "");

    // Verificar si el Pokémon ya está en la tabla
    var pokemonExists = pokemonTableData.some(pokemon => pokemon.name === pokemonName);

    if (!pokemonExists && pokemonTableData.length < 6) {
        pokemonTableData.push({ name: pokemonName, id: pokemonID });

        // Agregar una fila a la tabla
        var tableBody = document.querySelector("#pokemonTable tbody");
        var newRow = tableBody.insertRow();

        var nameCell = newRow.insertCell(0);
        nameCell.textContent = pokemonName;

        var idCell = newRow.insertCell(1);
        idCell.textContent = pokemonID;
    } else if (pokemonTableData.length >= 6) {
        alert("No se pueden agregar mas de 6 Pokémon.");
    } else {
        alert("El pokemon ya esta en la tabla.");
    }
}

const api = `https://pokeapi.co/api/v2/pokemon/`;


document.addEventListener('DOMContentLoaded',function(){
    const btnBuscar = document.getElementById('BuscarID')
})
function BusquedaID (api){

    const param  = getElementBy("id").value;
    
    const apiURL = api+param;

    fetc(apiURL).then(res=>{
        if(!res.ok){
            console.log("Error al consultar api")
        }
        return res.json();
    }).then(data => console.log(data)).catch(erro => alert(erro));
    
}


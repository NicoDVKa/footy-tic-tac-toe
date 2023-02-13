import { searchTeam } from "./fetchTeams.js";
import { searchPlayer } from "./fetchPlayers.js";

let teams = [];
let players = [];

let turno = true;

document.addEventListener('change',async  (e) => {
    let {target}   = e ;
    if(target.id.split('-')[0] === 'inputTeam'){
        let containerTeamID = target.id.substring(10,target.id.length);
        let containerTeam = document.getElementById("team-"+containerTeamID);
        let imgTeam = document.getElementById("img-team-"+containerTeamID);
        let searchsTeam = document.getElementById("searchTeam-"+containerTeamID);
        let team = target.value;
        let responseTeams = await searchTeam(team);
        searchsTeam.style.display = 'block';
        searchsTeam.innerHTML = '';
        if(responseTeams){
            if(responseTeams.length <= 4){
                searchsTeam.style.height = 'max-content';
            }   
            responseTeams.forEach( (team,i) => {
                searchsTeam.innerHTML += `
                <div id="itemTeam-${containerTeamID}-${i}" class="container__itemTeam"> 
                    <img id="search-imageTeam-${containerTeamID}-${i}" class="container__img container__img--small" 
                        src="${team.team_logo}" alt ="${team.team_name}">  ${team.team_name}
                </div>`
            });
        }else{
            searchsTeam.innerHTML += `<div>No hay equipos con ese nombre</div>`
            searchsTeam.style.height = 'max-content';
        }   
    }

    if(target.id.split('-')[0] === 'inputPlayer'){
        let containerPlayerID = target.id.substring(12,target.id.length);
        let containerTeam = document.getElementById("player-"+containerPlayerID);
        let imgPlayer = document.getElementById("img-player-"+containerPlayerID);
        let player = target.value;
        let responsePlayers = await searchPlayer(player);
        let searchsPlayer = document.getElementById("searchPlayer-"+containerPlayerID);
        searchsPlayer.style.display = 'block';
        searchsPlayer.innerHTML = '';
        if(responsePlayers){
            if(responsePlayers.length <= 4){
                searchsPlayer.style.height = 'max-content';
            }   
            responsePlayers.forEach( (player,i) => {
                searchsPlayer.innerHTML += `
                <div id="itemPlayer-${containerPlayerID}-${i}" class="container__itemPlayer"> 
                    <img id="search-imagePlayer-${containerPlayerID}-${i}" class="container__img container__img--small" 
                        src="${player.player_image}" alt ="${player.player_name}">  ${player.player_name}
                </div>`
            });
        }else{

            searchsPlayer.innerHTML += `<div>No hay equipos con ese nombre</div>`
            searchsPlayer.style.height = 'max-content';
        }  
    }


});

// document.addEventListener('focusout', (e) => {
//     let {target}  = e;
//     if(target.matches(".container__input")){
//         console.log("entre aca");
//         let containerTeamID = target.id.substring(10,target.id.length);
//         let searchsTeam = document.getElementById("searchTeam-"+containerTeamID);
//         searchsTeam.style.display = 'none';
//     }
// })

document.addEventListener('click', (e) => {
    let {target} = e;
    if(target.matches(".container__itemTeam")){
        let arrayID  = target.id.split('-');
        let index = arrayID.pop();
        let  containerTeamID = arrayID[1]+"-"+arrayID[2];

        let containerTeam = document.getElementById("team-"+containerTeamID);
        let imgTeam = document.getElementById("img-team-"+containerTeamID);
        let inputTeam = document.getElementById("inputTeam-"+containerTeamID);
        let searchsTeam = document.getElementById("searchTeam-"+containerTeamID);
        let searchsImgTeam = document.getElementById("search-imageTeam-"+containerTeamID+'-'+index);


        imgTeam.src = searchsImgTeam.src;
        inputTeam.value = searchsImgTeam.alt;

        searchsTeam.innerHTML = '';
        searchsTeam.style.display = 'none';
    }
    if(target.matches(".container__itemPlayer")){
        let arrayID  = target.id.split('-');
        let index = arrayID.pop();
        let  containerPlayerID = arrayID[1]+"-"+arrayID[2]+"-"+arrayID[3]+"-"+arrayID[4];

        let containerPlayer = document.getElementById("player-"+containerPlayerID);
        let imgPlayer = document.getElementById("img-player-"+containerPlayerID);
        let inputPlayer = document.getElementById("inputPlayer-"+containerPlayerID);
        let searchsPlayer = document.getElementById("searchPlayer-"+containerPlayerID);
        let searchsImgPlayer = document.getElementById("search-imagePlayer-"+containerPlayerID+'-'+index);


        imgPlayer.src = searchsImgPlayer.src;
        inputPlayer.value = searchsImgPlayer.alt;

        searchsPlayer.innerHTML = '';
        searchsPlayer.style.display = 'none';

        if(turno){
            containerPlayer.classList.add("container__player--green");
            turno = false;
        }else{
            containerPlayer.classList.add("container__player--red");
            turno = true;
        }
    }
})
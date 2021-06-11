// module condition de victoire
"use strict"

const fs = require ("fs");
const mod_aff.html = require ("./mod_aff_html");

function win (req,, nom_partie) {

	let sauvegarde;
	let resultat;
	let player 1;
	let player_2;
	let i;

	sauvegarde = JSON.parse (fs.readFileSync (`partie/${nom_partie}.json`,"UTF-8"));
	parties = JSON.parse(fs.readFileSync("./index_parties.json", "UTF-8"));

	 //récupération du nom de l'autre joueur

    for(i = 0;i < parties.length; i++) {
        if(parties[i].partie === nom_partie) {
            if(parties[i].Player_1 === req.headers.cookie) {
                player_1 = partie[i].player_1;
				player_2 = parties[i].Player_2;
            } else {
                player_2 = parties[i].Player_1;
            }
        }
    }


	// condition de victoire J1

	if (sauvegarde.player_1.coordonnees.y === 0) {
		sauvegarde.player_1.resultat = 1;
		fs.writeFileSync (`partie/${nom_partie}.json`,JSON.stringify(sauvegarde),"UTF-8"));

    }else if (sauvegarde.player_1.stats.pv === 0) {
        sauvegarde.player_2.resultat = 1;
		console.log("J1 a atteind l'arrivée ");

	}else {
		sauvegarde.player_1.resultat = 0;
	}
	
	// condition de victoire J2

    if (sauvegarde.player_2.coordonnees.y === sauvegarde.carte.length) {
        sauvegarde.player_2.resultat = 1;
        fs.writeFileSync (`partie/${nom_partie}.json`,JSON.stringify(sauvegarde),"UTF-8"));
    
	}else if (sauvegarde.player_1.stats.pv === 0) {
		sauvegarde.player_2.resultat = 1;
		console.log("J1 a atteind l'arrivée ");

	}else {
        sauvegarde.player_2.resultat = 0;
	}   


}

//----------------------------------------------------------

module.exports = win;

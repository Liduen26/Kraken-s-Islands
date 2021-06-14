//module d'affichage bateau
"use strict";
 
const fs = require("fs");
const mod_aff_html = require("./mod_aff_html");
const mod_win = require ("./mod_win.js");

function mod_aff(req, res, page, nom_partie) {
    
    let marqueurs = {};
    let partie;
	let parties;
    let x, y, i;
	let player_1;
	let player_2;


    partie = JSON.parse( fs.readFileSync(`partie/${nom_partie}.json`, "UTF-8"));

    for (y = 0; y <= partie.carte.length; y++) {
        for (x=0; x<= partie.carte[0].length; x++) {
            if (partie[req.headers.cookie].coordonnees.y === y && partie[req.headers.cookie].coordonnees.x === x) {
                partie.carte[y][x] = "b";
            }
        }
    }

    //rentrée de la carte dans l'html
    marqueurs.carteAff = mod_aff_html(partie.carte, 15);
	marqueurs.partie_query = nom_partie;


     //récupération du nom de l'autre joueur
	 
    parties = JSON.parse(fs.readFileSync("./index_parties.json", "UTF-8"));

    for(i = 0;i < parties.length; i++) {
        if(parties[i].partie === nom_partie) {
            if(parties[i].Player_1 === req.headers.cookie) {
                player_1 = parties[i].Player_1;
                player_2 = parties[i].Player_2;
            } else {
                player_2 = parties[i].Player_1;
				player_1 = parties[i].Player_2;
            }
        }
    }   
	console.log(player_1);
	marqueurs.pvJ1 = player_1 + ":" + partie[player_1].stats.pv;
	marqueurs.pvJ2 = player_2 + ":" +partie[player_2].stats.pv;



	mod_win (req, nom_partie);

    //affichage de la page html
    page = page.supplant(marqueurs);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
}

module.exports = mod_aff;

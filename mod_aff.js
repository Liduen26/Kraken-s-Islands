//module d'affichage du jeu
"use strict";
 
const fs = require("fs");
const mod_aff_html = require("./mod_aff_html");
const mod_win = require ("./mod_win.js");
const mod_zone_tir = require("./mod_zone_tir");
const mod_autre = require("./mod_autre_pseudo");

function mod_aff(req, res, page, nom_partie, tir, zone) {
    let marqueurs = {};
    let sauvegarde;
	let parties;
    let x, y, i;
	let player_autre = mod_autre(req, nom_partie);

    sauvegarde = JSON.parse( fs.readFileSync(`partie/${nom_partie}.json`, "UTF-8"));
	
	//mise en place du bateau sur la carte selon les coord du joueur
    for (y = 0; y <= sauvegarde.carte.length; y++) {
        for (x=0; x<= sauvegarde.carte[0].length; x++) {
            if (sauvegarde[req.headers.cookie].coordonnees.y === y && sauvegarde[req.headers.cookie].coordonnees.x === x) {
                sauvegarde.carte[y][x] = "b";
            }
        }
    }

	//mise en place de la zone d'après tir si elle doit y être
	if(sauvegarde[player_autre].a_tire === true && sauvegarde[player_autre].play === false) {
		sauvegarde = mod_zone_tir(req, nom_partie, sauvegarde);
	}

    //entrée de la carte dans l'html
    marqueurs.carteAff = mod_aff_html(sauvegarde.carte, 15, tir);
	marqueurs.partie_query = nom_partie;



	marqueurs.pvJ1 = req.headers.cookie + ":" + sauvegarde[req.headers.cookie].stats.pv;
	marqueurs.pvJ2 = player_autre + ":" + sauvegarde[player_autre].stats.pv;

    //affichage de la page html
    page = page.supplant(marqueurs);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
}

//------------------------------------------------------------------

module.exports = mod_aff;

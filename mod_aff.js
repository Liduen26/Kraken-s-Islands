//module d'affichage du jeu
"use strict";
 
const fs = require("fs");
const mod_aff_html2 = require("./mod_aff_html2.js");
const mod_win = require ("./mod_win.js");
const mod_zone_tir = require("./mod_zone_tir.js");
const mod_autre = require("./mod_autre_pseudo.js");
const mod_dissimulation = require("./mod_dissimulation.js");

function mod_aff(req, res, page, nom_partie, tir, zone) {
    let marqueurs = {};
    let sauvegarde;
	let parties;
    let x, y, i;
	let player_autre = mod_autre(req, nom_partie);
	let dist;
	let bat, bat_2;

    sauvegarde = JSON.parse( fs.readFileSync(`partie/${nom_partie}.json`, "UTF-8"));

	bat = sauvegarde[sauvegarde.equipe1].bateau;
	//mise en place du bateau sur la carte selon les coord du joueur
    for (y = 0; y <= sauvegarde.carte.length - 1; y++) {
        for (x=0; x<= sauvegarde.carte[0].length; x++) {
			dist = Math.hypot((sauvegarde[req.headers.cookie].coordonnees.y - y), (sauvegarde[req.headers.cookie].coordonnees.x - x));

			if (sauvegarde[req.headers.cookie].coordonnees.y === y && sauvegarde[req.headers.cookie].coordonnees.x === x) {
				if(req.headers.cookie === sauvegarde.equipe1) {
					if(dist <= sauvegarde[req.headers.cookie].stats.camo) {
						sauvegarde.carte[y][x] = "b_p";
					} else {
						sauvegarde.carte[y][x] = "b";
					}
				} else {
					if(dist <= sauvegarde[req.headers.cookie].stats.camo) {
						sauvegarde.carte[y][x] = "b_2_p";
					} else {
						sauvegarde.carte[y][x] = "b_2";
					}
				}
            } else if (dist <= sauvegarde[req.headers.cookie].stats.camo && sauvegarde.carte[y][x] === 0) {
				sauvegarde.carte[y][x] = "zb";
			}
        }
    }

	//mise en place de la zone d'après tir si elle doit y être
	if(sauvegarde[player_autre].a_tire === true && sauvegarde[player_autre].play === false) {
		sauvegarde = mod_zone_tir(req, nom_partie, sauvegarde);
	}

	sauvegarde = mod_dissimulation(req, nom_partie, sauvegarde, dist);

    //entrée de la carte dans l'html
    marqueurs.carteAff = mod_aff_html2(req, sauvegarde, 15, tir);
	marqueurs.partie_query = nom_partie;

	//changement d'états des bouttons en fonction de la situation
	if(sauvegarde[req.headers.cookie].tour === 0) {
		//phase 1
		marqueurs.d_espion = "disabled";
		marqueurs.d_sabot = "disabled";
		marqueurs.d_yeux = "disabled";
		marqueurs.d_barils = "disabled";
		marqueurs.d_tir = "disabled";
		marqueurs.d_depl = "";
		marqueurs.d_kraken = "disabled";
		marqueurs.d_tour = "disabled";

	} else if (sauvegarde[req.headers.cookie].tour === 1){
		//phase 2
		marqueurs.d_espion = "";
		marqueurs.d_sabot = "";
		marqueurs.d_yeux = "";
		marqueurs.d_barils = "";
		marqueurs.d_tir = "";
		marqueurs.d_depl = "disabled";
		marqueurs.d_kraken = "";
		marqueurs.d_tour = "";

	} else if (sauvegarde[req.headers.cookie].tour === 2){
		//phase 3
		marqueurs.d_espion = "disabled";
		marqueurs.d_sabot = "disabled";
		marqueurs.d_yeux = "disabled";
		marqueurs.d_barils = "disabled";
		marqueurs.d_tir = "disabled";
		marqueurs.d_depl = "disabled";
		marqueurs.d_kraken = "disabled";
		marqueurs.d_tour = "";

	}
	
	//changement d'état des bonus
	if(sauvegarde[req.headers.cookie].bonus.espion === 0) {
		marqueurs.d_espion = "disabled";
	} 
	if(sauvegarde[req.headers.cookie].bonus.sabotage === 0) {
		marqueurs.d_sabot = "disabled";
	} 
	if(sauvegarde[req.headers.cookie].bonus.oeil === 0) {
		marqueurs.d_yeux = "disabled";
	}
	if(sauvegarde[req.headers.cookie].bonus.barils === 0) {
		marqueurs.d_barils = "disabled";
	} 
	if(sauvegarde[req.headers.cookie].bonus.kraken === 0) {
		marqueurs.d_kraken = "disabled";
	} 

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

//module de requête pour le tir du bateau

"use strict";

const fs = require("fs");
const mod_aff = require("./mod_aff.js");

function tir(req, res, query) {
	//enregister les positions où le tir à eu lieu
	//appeler le pseudo du j2
	//vérifier si la pos du j2 === un tir
	//si oui : pv - atq
	//si non : rip

	let page;
	let i;
	let parties;
	let player_autre;
	let coord_tir = [];
	let sauvegarde;

	page = fs.readFileSync("m_jeu.html", "UTF-8");

	parties = JSON.parse(fs.readFileSync("./index_parties.json", "UTF-8"));
	//découpage des co de tir
	if(Array.isArray(query.tir) === true) {
		for(i = 0;i < query.tir.length; i++) {
			coord_tir[i] = [];
			coord_tir[i] = query.tir[i].split("_");
			
		}
	} else {
		coord_tir[0] = [];
		coord_tir[0] = query.tir.split("_");
	}

	//récupération du nom de l'autre joueur
	for(i = 0;i < parties.length; i++) {
		if(parties[i].partie === query.nom_partie) {
			if(parties[i].Player_1 === req.headers.cookie) {
				player_autre = parties[i].Player_2;
			} else {
				player_autre = parties[i].Player_1;
			}
		}
	}

	sauvegarde = JSON.parse(fs.readFileSync(`./partie/${query.nom_partie}.json`, "UTF-8"));
	for(i = 0;i < coord_tir.length; i++) {
		if(sauvegarde[player_autre].coordonnees.y === Number(coord_tir[i][0]) && sauvegarde[player_autre].coordonnees.x === Number(coord_tir[i][1])) {
			sauvegarde[player_autre].stats.pv -= sauvegarde[req.headers.cookie].stats.atq;
			//notes : il rentre pas dans la boucle jsp pk
		}
	}

	fs.writeFileSync(`./partie/${query.nom_partie}.json`, JSON.stringify(sauvegarde), "UTF-8");


	mod_aff(req, res, page, query.nom_partie);
}

//----------------------------------------------------------

module.exports = tir;

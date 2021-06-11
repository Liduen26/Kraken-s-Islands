//module de requête pour le tir du bateau

"use strict";

const fs = require("fs");
const mod_aff = require("./mod_aff.js");
const mod_autre = require("./mod_autre_pseudo.js");

function tir(req, res, query) {
	let page;
	let i;
	let player_autre;
	let coord_tir = [];
	let sauvegarde;

	page = fs.readFileSync("m_jeu.html", "UTF-8");

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

	player_autre = mod_autre(req, query.nom_partie);

	sauvegarde = JSON.parse(fs.readFileSync(`./partie/${query.nom_partie}.json`, "UTF-8"));
	for(i = 0;i < coord_tir.length; i++) {
		if(sauvegarde[player_autre].coordonnees.y === Number(coord_tir[i][0]) && sauvegarde[player_autre].coordonnees.x === Number(coord_tir[i][1])) {
			sauvegarde[player_autre].stats.pv -= sauvegarde[req.headers.cookie].stats.atq;
		}
	}

	sauvegarde[req.headers.cookie].a_tire = true;

	fs.writeFileSync(`./partie/${query.nom_partie}.json`, JSON.stringify(sauvegarde), "UTF-8");


	mod_aff(req, res, page, query.nom_partie);
}

//----------------------------------------------------------

module.exports = tir;

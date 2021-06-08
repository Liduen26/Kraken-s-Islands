//module d'actualisation de la salle d'attente du bateau

"use strict";

const fs = require("fs");
const aff = require("./mod_aff_html.js");

function actualiser(req, res, query) {
	let page;
	let parties;
	let i;
	let marqueurs = {};
	let player1, player2;
	let nom_partie = query.nom_partie;
	let sauvegarde;

	page = fs.readFileSync("./m_salle_attente2.html", "UTF-8");

	marqueurs.partie = query.nom_partie;
	marqueurs.partie_query = query.nom_partie;
	page = page.supplant(marqueurs);

	parties = JSON.parse(fs.readFileSync("index_parties.json", "UTF-8"));

	for(i = 0;i < parties.length;i++) {
		if(parties[i].partie === nom_partie) {
			player1 = parties[i].Player_1;
			player2 = parties[i].Player_2;
		}
	}

	sauvegarde = JSON.parse(fs.readFileSync(`partie/${nom_partie}.json`, "UTF-8"));
	
	if(sauvegarde[player1].bateau !== "" && sauvegarde[player2].bateau !== "") {
		if(sauvegarde[req.headers.cookie].play === true) {
			page = fs.readFileSync("./m_jeu.html", "UTF-8");
		} else {
			page = fs.readFileSync("./m_attente_tour.html", "UTF-8");
		}
		
		marqueurs.carteAff = aff(sauvegarde.carte, 15);
		marqueurs.query_partie = query.nom_partie;
		marqueurs.player = req.headers.cookie;
		page = page.supplant(marqueurs);
	}

	res.writeHead(200, { "Content-Type": "text/html"});
	res.write(page);
	res.end();
}

module.exports = actualiser;


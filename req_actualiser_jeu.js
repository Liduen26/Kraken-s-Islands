//module d'actualisation de la salle d'attente

"use strict";

const fs = require("fs");

function actualiser(req, res, query) {
	let page;
	let sauvegarde;
	let marqueurs = {};
	let parties;
	let i;
	let player_autre;

	page = fs.readFileSync("./m_attente_tour.html", "UTF-8");
	
	marqueurs.partie_query = query.nom_partie;

	sauvegarde = JSON.parse(fs.readFileSync(`./partie/${query.nom_partie}.json`, "UTF-8"));
	//détection du pseudo de l'autre joueur pour vérifier s'il joue
	parties = JSON.parse(fs.readFileSync("./index_parties.json", "UTF-8"));
	for(i = 0;i < parties.length;i++) {
		if(parties[i].partie === query.nom_partie) {
			if(parties[i].Player_1 === req.headers.cookie) {
				player_autre = parties[i].Player_2;
			} else {
				player_autre = parties[i].Player_1;
			}
		}
	}

	//est-ce qu'il joue ?
	if(sauvegarde[player_autre].play === false) {
		page = fs.readFileSync("./m_jeu.html", "UTF-8");
		sauvegarde[req.headers.cookie].play = true;
	}

	fs.writeFileSync(`partie/${query.nom_partie}.json`, JSON.stringify(sauvegarde), "UTF-8");

	marqueurs.partie_query = query.nom_partie;
	marqueurs.player = query.player;
	page = page.supplant(marqueurs);

	res.writeHead(200, { "Content-Type": "text/html"});
	res.write(page);
	res.end();
}

module.exports = actualiser;


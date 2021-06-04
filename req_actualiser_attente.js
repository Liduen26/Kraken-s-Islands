//module d'actualisation de la salle d'attente

"use strict";

const fs = require("fs");

function actualiser(req, res, query) {
	let contenu;
	let page;
	let parties;
	let i;
	let marqueurs = {};
	let verif = false;
	let sauvegarde = {};
	let x1, x2;
	let valide = false;

	page = fs.readFileSync("./m_salle_attente.html", "UTF-8");
	
	marqueurs.partie = query.nom_partie;
	

	contenu = fs.readFileSync("./index_parties.json", "UTF-8");
	parties = JSON.parse(contenu);
	
	for(i = 0;i < parties.length; i++) {
		if(parties[i].Player_1 === req.headers.cookie) {
			if(parties[i].Player_2 !== null) {
				page = fs.readFileSync("./m_choix_bateau.html", "UTF-8");

				sauvegarde = JSON.parse(fs.readFileSync(`partie/${parties[i].partie}.json`, "UTF-8"));

				sauvegarde[parties[i].Player_1] = {};
				sauvegarde[parties[i].Player_1].bateau = "";
				sauvegarde[parties[i].Player_2] = {};
				sauvegarde[parties[i].Player_2].bateau = "";

				sauvegarde[parties[i].Player_1].coordonees = {};

				//création du spwan aléatoire sur le coté de la carte du J1
				while (valide !== true) {
					valide = true;
					x1 = Math.floor(Math.random() * (sauvegarde.carte[0].length + 1));

					if(sauvegarde.carte[0][x1] !== 0) {
						valide = false;
					}
				} 
				sauvegarde[parties[i].Player_1].coordonees.x = x1;
				sauvegarde[parties[i].Player_1].coordonees.y = 0;


				sauvegarde[parties[i].Player_2].coordonees = {};

				//création du spwan aléatoire sur le coté de la carte du J2
				valide = false;
				while (valide !== true) {
					valide = true;
					x2 = Math.floor(Math.random() * (sauvegarde.carte[0].length + 1));

					if(sauvegarde.carte[0][x2] !== 0) {
						valide = false;
					}
				} 
				sauvegarde[parties[i].Player_2].coordonees.x = x2;
				sauvegarde[parties[i].Player_2].coordonees.y = 0;

				//création des bonus
				sauvegarde[parties[i].Player_1].bonus = {};
				sauvegarde[parties[i].Player_2].bonus = {};

				sauvegarde[parties[i].Player_1].bonus.espion = 2;
				sauvegarde[parties[i].Player_2].bonus.espion = 2;

				sauvegarde[parties[i].Player_1].bonus.oeil = 1;
				sauvegarde[parties[i].Player_2].bonus.oeil = 1;

				sauvegarde[parties[i].Player_1].bonus.sabotage = 2;
				sauvegarde[parties[i].Player_2].bonus.sabotage = 2;

				sauvegarde[parties[i].Player_1].bonus.barils = 4;
				sauvegarde[parties[i].Player_2].bonus.barils = 4;

				sauvegarde[parties[i].Player_1].bonus.kraken = 0;
				sauvegarde[parties[i].Player_2].bonus.kraken = 0;

				//création des stats
				sauvegarde[parties[i].Player_1].stats = {};
				sauvegarde[parties[i].Player_2].stats = {};

				sauvegarde[parties[i].Player_1].stats.pv = 0;
				sauvegarde[parties[i].Player_2].stats.pv = 0;

				sauvegarde[parties[i].Player_1].stats.attaque = 0;
				sauvegarde[parties[i].Player_2].stats.attaque = 0;

				sauvegarde[parties[i].Player_1].stats.camo = 0;
				sauvegarde[parties[i].Player_2].stats.camo = 0;

				fs.writeFileSync(`partie/${parties[i].partie}.json`, JSON.stringify(sauvegarde), "UTF-8");
			}
		}
	}

	marqueurs.partie_query = query.nom_partie;
	page = page.supplant(marqueurs);

	res.writeHead(200, { "Content-Type": "text/html"});
	res.write(page);
	res.end();
}

module.exports = actualiser;


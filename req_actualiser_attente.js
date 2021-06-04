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
	let bateaux;

	page = fs.readFileSync("./m_salle_attente.html", "UTF-8");
	
	marqueurs.partie = query.nom_partie;
	

	contenu = fs.readFileSync("./index_parties.json", "UTF-8");
	parties = JSON.parse(contenu);
	
	for(i = 0;i < parties.length; i++) {
		if(parties[i].Player_1 === req.headers.cookie) {
			if(parties[i].Player_2 !== null) {
				page = fs.readFileSync("./m_choix_bateau.html", "UTF-8");
				
				bateaux = JSON.parse(fs.readFileSync("stats_bateaux.json","UTF-8"));

				console.log(bateaux);
				marqueurs.schooner = `Stats: <br>PV:${bateaux.schooner.pv} <br>Attaque:${bateaux.schooner.atq}<br>Visibilité:${bateaux.schooner.camo}`;
				
				marqueurs.brick = `Stats: <br>PV:${bateaux.brick.pv} <br>Attaque:${bateaux.brick.atq}<br>Visibilité:${bateaux.brick.camo}`;
				
				marqueurs.fregate = `Stats: <br>PV:${bateaux.fregate.pv} <br>Attaque:${bateaux.fregate.atq}<br>Visibilité:${bateaux.fregate.camo}`;
				
				marqueurs.galion = `Stats: <br>PV:${bateaux.galion.pv} <br>Attaque:${    bateaux.galion.atq}<br>Visibilité:${bateaux.galion.camo}`;

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


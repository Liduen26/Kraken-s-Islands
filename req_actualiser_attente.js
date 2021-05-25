//module d'actualisation de la salle d'attente

"use strict";

const fs = require("fs");

function actualiser(req, res, query) {
	let contenu;
	let page;
	let parties;
	let i;
	let marqueurs = {};
	let meta_r = `<meta http-equiv="refresh" content="5; url=http://google.fr">`;
	let verif = false;

	page = fs.readFileSync("./m_salle_attente.html", "UTF-8");
	
	marqueurs.partie = req.headers.cookie;
	page = page.supplant(marqueurs);

	contenu = fs.readFileSync("./index_parties.json", "UTF-8");
	parties = JSON.parse(contenu);
	
	for(i = 0;i < parties.length; i++) {
		if(parties[i].Player_1 === req.headers.cookie) {
			if(parties[i].Player_2 !== null) {
				page = fs.readFileSync("./m_choix_bateau.html", "UTF-8");

			}
		}
	}

	res.writeHead(200, { "Content-Type": "text/html"});
	res.write(page);
	res.end();
}

module.exports = actualiser;


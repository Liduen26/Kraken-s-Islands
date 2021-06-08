//module d'actualisation de la salle d'attente

"use strict";

const fs = require("fs");

function actualiser(req, res, query) {
	let page;
	let sauvegarde;

	page = fs.readFileSync("./m_attente_jeu.html", "UTF-8");
	
	marqueurs.partie_query = query.nom_partie;

	sauvegarde = JSON.parse(fs.readFileSync(`./partie/${query.nom_partie}.json`, "UTF-8");
	//mettre ici la détection de si le Player.play === true ou false pour regarder qui joue
	if(sauvegarde[query.player1].play === false) {
		page = fs.readFileSync("./m_jeu.html", "UTF-8");
		sauvegarde[req.headers.cookie].play = true;
	}

	marqueurs.partie_query = query.nom_partie;
	page = page.supplant(marqueurs);

	res.writeHead(200, { "Content-Type": "text/html"});
	res.write(page);
	res.end();
}

module.exports = actualiser;


//module d'actualisation de la salle d'attente 

"use strict"

const fs = require("fs");
const aff = require("./mod_aff_html.js");

function t_suivant(req, res, query) {
	let page;
	let sauvegarde = {};
	let marqueurs = {};

	page = fs.readFileSync("./m_attente_tour.html", "UTF-8");
	page = page.supplant(marqueurs);
	
	sauvegarde = JSON.parse(fs.readFileSync(`./partie/${query.nom_partie}.json`, "UTF-8"));

	sauvegarde[req.headers.cookie].play = false;
	marqueurs.carteAff = aff(sauvegarde.carte, 15);

	fs.writeFileSync(`./partie/${query.nom_partie}.json`, JSON.stringify(sauvegarde), "UTF-8");
	
	marqueurs.partie_query = query.nom_partie;
	marqueurs.player = req.headers.cookie;
	page = page.supplant(marqueurs);

	res.writeHead(200, { "Content-Type": "text/html"});
    res.write(page);
    res.end();
}

//----------------------------------------------------------

module.exports = t_suivant;

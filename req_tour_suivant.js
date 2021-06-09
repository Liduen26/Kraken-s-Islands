//module d'actualisation de la salle d'attente du tour suivant 

"use strict"

const fs = require("fs");
const aff = require("./mod_aff_html.js");
const mod_aff = require("./mod_aff.js");

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
	
	mod_aff(req, res, page, query.nom_partie);
}

//----------------------------------------------------------

module.exports = t_suivant;

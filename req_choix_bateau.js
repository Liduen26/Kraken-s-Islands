
"use strict"

const fs = require("fs");

function choix(req, res, query) {
	let i;
	let page;
	let contenu;
	let parties = [];
	let sauvegarde = {};
	let nom_partie;
	let pseudo;
	let marqueurs = {};

	page = fs.readFileSync("m_salle_attente2.html", "UTF-8");
	
	nom_partie = query.nom_partie;
	
	contenu = fs.readFileSync(`partie/partie_${nom_partie}.json`, "UTF-8");
	sauvegarde = JSON.parse(contenu);

	console.log(sauvegarde.Liduen);
		
	pseudo = req.headers.cookie;
	sauvegarde[pseudo] = {};
	sauvegarde[pseudo].bateau = query.choixbateau;

	console.log(sauvegarde.Liduen);

	fs.writeFileSync(`partie/partie_${nom_partie}.json`, JSON.stringify(sauvegarde) ,"UTF-8");
	
	marqueurs.partie_query = query.nom_partie;
	page = page.supplant(marqueurs);
	
	res.writeHead(200, {"Content-type": "text/html"});
	res.write(page);
	res.end();
}

module.exports = choix;

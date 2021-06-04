//=========================================================================
// Traitement de "req_rejoindre"
// Auteurs : P. Thiré & T. Kerbrat
// Version : 15/09/2020
//=========================================================================
"use strict";

const fs = require("fs");
require('remedial');

const trait = function (req, res, query) {
	let marqueurs = {};
	let page;
	let contenu;
	let partie;
	let i = 0;
	
	page = fs.readFileSync('m_choix_bateau.html', 'utf-8');

	contenu = fs.readFileSync("index_parties.json", "UTF-8");
	partie = JSON.parse(contenu);

	for(i = 0;i < partie.length;i++) {
		if(partie[i].Player_1 === query.Player_1) {
			partie[i].Player_2 = req.headers.cookie;
			partie[i].status_p = "en cours";
		}
	}

	sauvegarde[req.headers.cookie].coordonees = {};

	//création du spwan aléatoire sur le coté de la carte du J2
	
	valide = false;
	while (valide !== true) {
		valide = true;
		x2 = Math.floor(Math.random() * (sauvegarde.carte[0].length + 1));

		if(sauvegarde.carte[0][x2] !== 0) {
			valide = false;
		}
	}
	
	sauvegarde[req.headers.cookie].coordonees.x = x2;
	sauvegarde[req.headers.cookie].coordonees.y = 0;


	//création des bonus
	
	sauvegarde[req.headers.cookie].bonus = {};
	sauvegarde[req.headers.cookie].bonus.espion = 2;
	sauvegarde[req.headers.cookie].bonus.oeil = 1;
	sauvegarde[req.headers.cookie].bonus.sabotage = 2;
	sauvegarde[req.headers.cookie].bonus.barils = 4;
	sauvegarde[req.headers.cookie].bonus.kraken = 0;

	//création des stats
	
	sauvegarde[req.headers.cookie].stats = {};
	sauvegarde[req.headers.cookie].stats.pv = 0;
	sauvegarde[req.headers.cookie].stats.attaque = 0;
	sauvegarde[req.headers.cookie].stats.camo = 0;


	fs.writeFileSync("index_parties.json", JSON.stringify(partie), "UTF-8");

	marqueurs.partie_query = query.nom_partie;
	page = page.supplant(marqueurs);

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
};

//--------------------------------------------------------------------------

module.exports = trait;

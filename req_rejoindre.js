//requête permettant de rejoindre une partie

"use strict";

const fs = require("fs");

function trait(req, res, query) {
	let marqueurs = {};
	let page;
	let contenu;
	let partie;
	let i = 0;
	let valide;
	let x2;
	let sauvegarde = {};
	let nom_partie;
	let bateaux;
	
	page = fs.readFileSync('m_choix_bateau.html', 'utf-8');

	contenu = fs.readFileSync("index_parties.json", "UTF-8");
	partie = JSON.parse(contenu);

	for(i = 0;i < partie.length;i++) {
		if(partie[i].Player_1 === query.Player_1) {
			partie[i].Player_2 = req.headers.cookie;
			partie[i].status_p = "en cours";
			nom_partie = partie[i].partie;
		}
	}
	
	sauvegarde = JSON.parse(fs.readFileSync(`partie/${nom_partie}.json`, "UTF-8"));

	//Parmètres J2

	sauvegarde[req.headers.cookie] = {};
	sauvegarde[req.headers.cookie].bateau = "";
	sauvegarde[req.headers.cookie].coordonnees = {};

	//création du spwan aléatoire sur le coté de la carte du J2
	
	valide = false;
	while (valide !== true) {
		valide = true;
		x2 = Math.floor(Math.random() * (sauvegarde.carte[0].length + 1));

		if(sauvegarde.carte[0][x2] !== 0) {
			valide = false;
		}
	}
	
	//création des coordonées
	sauvegarde[req.headers.cookie].coordonnees.x = x2;
	sauvegarde[req.headers.cookie].coordonnees.y = 0;

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
	sauvegarde[req.headers.cookie].stats.atq = 0;
	sauvegarde[req.headers.cookie].stats.camo = 0;
	
	//création de la zone
	sauvegarde[req.headers.cookie].zone = {}; 
	sauvegarde[req.headers.cookie].zone.y = 0;
	sauvegarde[req.headers.cookie].zone.x = 0;
	sauvegarde[req.headers.cookie].zone.y_p = 0;
	sauvegarde[req.headers.cookie].zone.x_p = 0;
	

	sauvegarde[req.headers.cookie].play = false;
	
	sauvegarde[req.headers.cookie].a_tire = false;

	fs.writeFileSync(`partie/${nom_partie}.json`, JSON.stringify(sauvegarde), "UTF-8");
	fs.writeFileSync("index_parties.json", JSON.stringify(partie), "UTF-8");

	bateaux = JSON.parse(fs.readFileSync("stats_bateaux.json","UTF-8"));

	marqueurs.schooner = `Stats: <br>PV:${bateaux.schooner.pv} <br>Attaque:${bateaux.schooner.atq}<br>Visibilité:${bateaux.schooner.camo}`;

	marqueurs.brick = `Stats: <br>PV:${bateaux.brick.pv} <br>Attaque:${bateaux.brick.atq}<br>Visibilité:${bateaux.brick.camo}`;

	marqueurs.fregate = `Stats: <br>PV:${bateaux.fregate.pv} <br>Attaque:${bateaux.fregate.atq}<br>Visibilité:${bateaux.fregate.camo}`;

	marqueurs.galion = `Stats: <br>PV:${bateaux.galion.pv} <br>Attaque:${    bateaux.galion.atq}<br>Visibilité:${bateaux.galion.camo}`;

	marqueurs.partie_query = query.nom_partie;
	page = page.supplant(marqueurs);

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
}

//--------------------------------------------------------------------------

module.exports = trait;

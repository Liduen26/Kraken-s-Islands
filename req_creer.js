//=========================================================================
// Traitement de "salle d'attente"
// Auteurs : P. Thiré & T. Kerbrat
// Version : 15/09/2020
//=========================================================================
"use strict";

const fs = require("fs");
require('remedial');

const trait = function (req, res, query, carte, pseudo) {

	let marqueurs = {};
	let page;
	
	let nom_parties = query.nom_partie;
	let contenu;
	let index_p = [];
	let unique;
	//let erreur = "";
	// AFFICHAGE DE LA modele_formulaire_inscription

	index_p.push({
			"partie": "test",
			"pseudo": "test",
			"status": "en attente"});


	contenu = fs.readFileSync("index_parties.json", "UTF-8");
	console.log(contenu);
	index_p = JSON.parse(contenu);
	
	for(let i = 0;i < index_p.length;i++) {
		if(index_p[i].partie === nom_parties) {
			page = fs.readFileSync("m_creation_partie.html", "UTF-8");
			
			marqueurs.erreur = "Une partie est déjà en cours avec ce nom, merci d'en choisir un autre";
			page = page.supplant(marqueurs);
			unique = false;
		} else {
			unique = true;
		}
	}

	if(unique === true) {
		page = fs.readFileSync('m_salle_attente.html', 'utf-8');

		index_p.push({
			"partie": nom_parties,
			"pseudo": pseudo,
			"status": "en attente"});

		//écriture de la carte dans un fichier .json
		fs.writeFileSync (`./partie/partie_${nom_parties}.json`, JSON.stringify(carte), "UTF-8");
		fs.writeFileSync("index_parties.json", JSON.stringify(index_p), "UTF-8");

		marqueurs.partie = nom_parties;
		page = page.supplant(marqueurs);

	}
	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();

};

//--------------------------------------------------------------------------

module.exports = trait;

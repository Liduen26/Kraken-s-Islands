//=========================================================================
// Traitement de "salle d'attente"
// Auteurs : P. Thiré & T. Kerbrat
// Version : 15/09/2020
//=========================================================================
"use strict";

const fs = require("fs");
require('remedial');

const trait = function (req, res, query, carte) {

	let marqueurs = {};
	let page;
	
	let nom_parties = query.nom_partie;




	// AFFICHAGE DE LA modele_formulaire_inscription

	page = fs.readFileSync('m_salle_attente.html', 'utf-8');

	//écriture de la carte dans un fichier .json
    fs.writeFileSync (`./partie/partie_${nom_parties}.json`, JSON.stringify(carte), "UTF-8");

	 marqueurs.partie = nom_parties;
     page = page.supplant(marqueurs);

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
};

//--------------------------------------------------------------------------

module.exports = trait;

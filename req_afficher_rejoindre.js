//=========================================================================
// Traitement de "req_afficher_rejoindre"
// Auteurs : P. Thiré & T. Kerbrat
// Version : 15/09/2020
//=========================================================================
"use strict";

const fs = require("fs");
require('remedial');

const trait = function (req, res, query) {

	let marqueurs;
	let page;
	let content_rep = [];

	// AFFICHAGE DE LA modele_formulaire_inscription

	page = fs.readFileSync('m_rejoindre_partie.html', 'utf-8');

	content_rep = fs.readdirSync("./partie");
	console.log(content_rep);

	for(let i = 0;i < content_rep.length;i++) {
		//ici faut mettre un truc pour générer de l'html et le join à la fin
	}

	marqueurs = {};
	marqueurs.parties = content_rep[0];
	page = page.supplant(marqueurs);

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
};

//--------------------------------------------------------------------------

module.exports = trait;

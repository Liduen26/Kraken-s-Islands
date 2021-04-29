//=========================================================================
// Traitement de "req_afficher_attente"
// Auteurs : P. Thiré & T. Kerbrat
// Version : 15/09/2020
//=========================================================================
"use strict";

const fs = require("fs");
require('remedial');

const trait = function (req, res, query) {

	let marqueurs;
	let page;

	// AFFICHAGE DE LA modele_formulaire_inscription

	page = fs.readFileSync('m_salle_attente.html', 'utf-8');

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
};

//--------------------------------------------------------------------------

module.exports = trait;

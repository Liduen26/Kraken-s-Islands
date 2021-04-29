//=========================================================================
// Traitement de "req_commencer"
// Auteurs : P. Thiré & T. Kerbrat
// Version : 15/09/2020
//=========================================================================
"use strict";

const fs = require("fs");
require('remedial');

const trait = function (req, res, pseudo) {

	let marqueurs;
	let page;

	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('m_menu.html', 'utf-8');
	
	marqueurs = {};
	marqueurs.pseudo = pseudo;
	page = page.supplant(marqueurs);

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;

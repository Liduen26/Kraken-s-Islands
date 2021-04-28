//=========================================================================
// Traitement de "req_commencer"
// Auteurs : P. Thiré & T. Kerbrat
// Version : 15/09/2020
//=========================================================================
"use strict";

const fs = require("fs");
require('remedial');

const trait = function (req, res) {

	let marqueurs;
	let page;

	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('m_accueil.html', 'utf-8');


	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;

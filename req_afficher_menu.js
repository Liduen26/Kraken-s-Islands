//=========================================================================
// Traitement de "req_afficher_menu"
// Auteurs : Nous
// Version : 2021
//=========================================================================
"use strict";

const fs = require("fs");
require('remedial');

const trait = function (req, res, query) {

	let marqueurs;
	let page;

	// AFFICHAGE De la page menu

	page = fs.readFileSync('m_menu.html', 'utf-8');

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
};

//--------------------------------------------------------------------------

module.exports = trait;

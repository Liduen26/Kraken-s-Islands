//=========================================================================
// Traitement de "req_au_revoir"
// Auteurs : Pas toi
// Version : 2021
//=========================================================================
"use strict";

const fs = require("fs");
require('remedial');

const trait = function (req, res) {

	let page;

	// Quitter

	page = fs.readFileSync('m_au_revoir', 'utf-8');
	
	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;

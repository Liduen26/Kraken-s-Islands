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

	fs.writeFileSync("index_parties.json", JSON.stringify(partie), "UTF-8");

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
};

//--------------------------------------------------------------------------

module.exports = trait;

//module d'actualisation de la salle d'attente

"use strict";

const fs = require("fs");

function actualiser(req, res, query) {
	let page;
	let parties;
	let i;
	let marqueurs = {};

	page = fs.readFileSync("./m_salle_attente2.html", "UTF-8");

	
	
	res.writeHead(200, { "Content-Type": "text/html"});
	res.write(page);
	res.end();
}

module.exports = actualiser;


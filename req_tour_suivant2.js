//module d'actualisation de la salle d'attente 

"use strict"

const fs = require("fs");
let page;

function attente(req, res, query) {

	page = fs.readFileSync("./m_tour_suivant.html", "UTF-8");
	page = page.supplant(marqueurs);
	
	res.writeHead(200, { "Content-Type": "text/html"});
    res.write(page);
    res.end();
}

module.exports = attente;




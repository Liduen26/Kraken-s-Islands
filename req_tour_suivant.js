//module d'actualisation de la salle d'attente 

"use strict"

const fs = require("fs");

function t_suivant(req, res, query) {
	let page;
	let sauvegarde;

	page = fs.readFileSync("./m_tour_suivant.html", "UTF-8");
	page = page.supplant(marqueurs);
	
	sauvegarde = JSON.parse(fs.readFileSync(`./partie/${partie_query}.json`, "UTF-8"));

	sauvegarde[req.headers.cookie].play = false;

	fs.writeFileSync(`./partie/${partie_query}.json`, JSON.stringify(sauvegarde), "UTF-8");
	
	marqueurs.player1 = req.headers.cookie;
	page = page.supplant(marqueurs);

	res.writeHead(200, { "Content-Type": "text/html"});
    res.write(page);
    res.end();
}

module.exports = t_suivant;

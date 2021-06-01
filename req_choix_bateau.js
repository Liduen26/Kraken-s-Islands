
"use strict"

const fs = require("fs");

function choix(req, res, query) {
	let i;
	let page;
	let contenu;
	let parties = [];
	let sauvegarde = {};
	let nom_partie;
	let pseudo;

	page = fs.readFileSync("m_salle_attente2.html", "UTF-8");
	
	contenu = fs.readFileSync("index_parties.json", "UTF-8");
	parties = JSON.parse(contenu);
	console.log(parties);
	for(i = 0;i < parties.length;i++) {
		if(parties[i].Player_1 === req.headers.cookie) {
			nom_partie = parties[i].partie;
		}
	}
	console.log(3);
	contenu = fs.readFileSync(`partie/partie_${nom_partie}.json`, "UTF-8");
	sauvegarde = JSON.parse(contenu);

	console.log(sauvegarde);
		
	pseudo = req.headers.cookie;
	sauvegarde[pseudo] = {};
	sauvegarde[pseudo].bateau = query.choixbateau;

	console.log(sauvegarde);

	fs.writeFileSync(`partie/partie_${nom_partie}.json`, JSON.stringify(sauvegarde) ,"UTF-8");
	
	res.writeHead(200, {"Content-type": "text/html"});
	res.write(page);
	res.end;
	console.log(4);

}

module.exports = choix;

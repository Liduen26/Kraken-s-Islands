
"use strict";

const url = require("url");
const fs = require("fs");


let requete;
let pathname;
let deplacement;
let partie;

function index(req, res, query) {

	deplacement = query.direction;
	partie = JSON.parse( fs.readFileSync("test.json", "UTF-8"));

	switch(deplacement) {
		case 'haut':
			partie.Nasicas.coordonnees.y = partie.Nasicas.coordonnees.y+1;
			break;
		case 'droite':
			partie.Nasicas.coordonnees.x = partie.Nasicas.coordonnees.x+1;
			break;
		case 'gauche':
			partie.Nasicas.coordonnees.x = partie.Nasicas.coordonnees.x-1;
			break;
		case 'bas':
			partie.Nasicas.coordonnees.y = partie.Nasicas.coordonnees.y-1;
			break;
	}

	fs.writeFileSync(`test.json`, JSON.stringify(partie) ,"UTF-8");
}


	module.exports = index;

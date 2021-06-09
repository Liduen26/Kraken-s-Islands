"use strict";

const url = require("url");
const fs = require("fs");


let requete;
let pathname;
let deplacement;
let partie;
let carte;
let x,y;
let dx,dy;;


function index(req, res, query) {


	deplacement = query.direction;
	partie = JSON.parse (fs.readFileSync("test.json", "UTF-8")); 
	// "./partie/${nom_parties}.json" //

	
	x = partie.Nasicas.coordonnees.x;
	y = partie.Nasicas.coordonnees.y;

	switch(deplacement) {
		case 'haut':
			dy = y--;
			if (partie.Nasicas.coordonnees.y > 0) { 
				if (partie.carte[dy][dx] === 0) { 
					partie.Nasicas.coordonnees.y = partie.Nasicas.coordonnees.y-1;
				} else { 
					dy --; 
					}
			}
			break;
		case 'droite':
			dx = x+1;
			if ( partie.Nasicas.coordonnees.x < partie.carte[0].length ) {
				if (partie.carte[dy][dx] === 0) { 
					partie.Nasicas.coordonnees.x = partie.Nasicas.coordonnees.x+1;
				} else { 
					dx --; 
					}

			}
			break;
		case 'gauche':
			dx = x-1
			if ( partie.Nasicas.coordonnees.x > 0 ) {
				if (partie.carte[dy][dx] === 0) { 
					partie.Nasicas.coordonnees.x = partie.Nasicas.coordonnees.x-1;
					}

			}
			break;
		case 'bas':
			if ( partie.Nasicas.coordonnees.y < partie.carte.length ) {
				if (partie.carte[dy][dx] === 0) {
					partie.Nasicas.coordonnees.y = partie.Nasicas.coordonnees.y+1;
				} else { 
				dy --; 
				}

			}
			break;
	}

	fs.writeFileSync(`test.json`, JSON.stringify(partie) ,"UTF-8");
}


	module.exports = index;

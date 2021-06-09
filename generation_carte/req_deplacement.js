
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
	dx = x+1;
	dy = y+1;

	switch(deplacement) {
		case 'haut':
			if (partie.Nasicas.coordonnees.y > 0) { console.log("ouais"+partie.carte[dy][dx]); 
				if (partie.carte[dy][dx] === 0) { console.log("nan bof");
					partie.Nasicas.coordonnees.y = partie.Nasicas.coordonnees.y-1;
				} else { 
					dy --; 
					}
			}
			break;
		case 'droite':
		console.log("ouais"+partie.carte[dy][dx]);
			if ( partie.Nasicas.coordonnees.x < partie.carte[0].length ) {
				if (partie.carte[dy][dx] === 0) { console.log("ouais"+partie.carte[dy][dx]);
					partie.Nasicas.coordonnees.x = partie.Nasicas.coordonnees.x+1;
				} else { 
					dx --; 
					}

			}
			break;
		case 'gauche':
		console.log("ouais"+partie.carte[dy][dx]);
			if ( partie.Nasicas.coordonnees.x > 0 ) {
				if (partie.carte[dy][dx] === 0) { console.log("ouais"+partie.carte[dy][dx]);
					partie.Nasicas.coordonnees.x = partie.Nasicas.coordonnees.x-1;
				} else { 
					x = x-1; 
					dx--; 
					console.log(partie.Nasicas.coordonnees.x,partie.carte[dy][dx],partie.Nasicas.coordonnees.y,dx,x);
					}

			}
			break;
		case 'bas':
		console.log("ouais"+partie.carte[dy][dx]);
			if ( partie.Nasicas.coordonnees.y < partie.carte.length ) {
				if (partie.carte[dy][dx] === 0) {console.log("ouais"+partie.carte[dy][dx]);
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

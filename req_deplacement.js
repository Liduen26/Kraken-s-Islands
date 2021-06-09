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
	partie = JSON.parse (fs.readFileSync(`./partie/${query.nom_partie}.json`, "UTF-8")); 

	dx = partie[req.headers.cookie].coordonnees.x;
	dy = partie[req.headers.cookie].coordonnees.y;
	
	
	switch(deplacement) {
		
		case 'haut':
			if (partie[req.headers.cookie].coordonnees.y > 0) {
				dy--;
				if (partie.carte[dy][dx] === 0) { 
					partie[req.headers.cookie].coordonnees.y -= 1;
				}
			}
			break;
		
		case 'droite':
			if ( partie[req.headers.cookie].coordonnees.x < partie.carte[0].length ) {
				dx++;
                if (partie.carte[dy][dx] === 0) { 
                    partie[req.headers.cookie].coordonnees.x += 1;
				}
			}
			break;
		
		case 'gauche':
			if ( partie[req.headers.cookie].coordonnees.x > 0 ) {
				dx--;
                if (partie.carte[dy][dx] === 0) { 
                    partie[req.headers.cookie].coordonnees.x -= 1;
				}
			}
			break;
		
		case 'bas':
			if ( partie[req.headers.cookie].coordonnees.y < partie.carte.length ) {
				dy++;
                if (partie.carte[dy][dx] === 0) { 
                    partie[req.headers.cookie].coordonnees.y += 1;
				}
			}
			break;
	}

	fs.writeFileSync(`test.json`, JSON.stringify(partie) ,"UTF-8");
}


module.exports = index;

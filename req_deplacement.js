"use strict";

const url = require("url");
const fs = require("fs");
const mod_aff = require("./mod_aff.js");

function index(req, res, query) {
	let deplacement;
	let partie;
	let carte;
	let dx,dy;
	let page;

	page = fs.readFileSync("m_jeu.html", "UTF-8");

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

	fs.writeFileSync(`./partie/${query.nom_partie}.json`, JSON.stringify(partie) ,"UTF-8");

	mod_aff(req, res, page, query.nom_partie);
}


module.exports = index;
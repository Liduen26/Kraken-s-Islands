//module indiquant la zone dans laquelle se trouve un joueur venant de tirer

"use strict"

const fs = require("fs");
const mod_aff = require("./mod_aff.js");
const mod_autre = require("./mod_autre_pseudo");

function zone(req, nom_partie, sauvegarde) {
	let page;
	let random;
	let zone = {};
	let player_autre = mod_autre(req, nom_partie);
	let y, x;
	console.log(player_autre);
	console.log(sauvegarde);

	zone.zy = sauvegarde[player_autre].coordonnees.y;
	zone.zx = sauvegarde[player_autre].coordonnees.x;
	
	console.log(zone);
	zone.zy -= Math.floor(Math.random() * 5);
	zone.zy_p = zone.zy + 4;
	
	zone.zx -= Math.floor(Math.random() * 5);
	zone.zx_p = zone.zx + 4;
	console.log(zone);
	
	//mise en place de la zone grise
	for (y = 0; y <= sauvegarde.carte.length; y++) {
        for (x=0; x<= sauvegarde.carte[0].length; x++) {
            if ((x >= zone.zx && x <= zone.zx_p) && (y >= zone.zy && y <= zone.zy_p)) {
				sauvegarde.carte[y][x] = "z";				
            }
        }
    } 
	
	sauvegarde[player_autre].a_tire === false;

	return sauvegarde;

}

//------------------------------------------------------------

module.exports = zone;

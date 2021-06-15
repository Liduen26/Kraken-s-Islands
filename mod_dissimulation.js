//module de gestion de la dissimulation

"use strict";

const fs = require("fs");
const mod_autre = require("./mod_autre_pseudo.js");

function vu(req, nom_partie, sauvegarde) {
	/*
	prend le json
	regarde la disance entre les deux bateaux
	si dist < à stats.dis
	alors afficher les deux pour le joueur
	
	*/

	console.log("vu");

	let page; 
	let player_autre = mod_autre(req, nom_partie);
	let distance_bateau;
	let y, x;

	distance_bateau = Math.hypot((sauvegarde[req.headers.cookie].coordonnees.y - sauvegarde[player_autre].coordonnees.y), (sauvegarde[req.headers.cookie].coordonnees.x - sauvegarde[player_autre].coordonnees.x));

	y = sauvegarde[player_autre].coordonnees.y;
	x = sauvegarde[player_autre].coordonnees.x;

	
	if(distance_bateau <= sauvegarde[player_autre].stats.camo) {
		sauvegarde.carte[y][x] = "b";
	}

	return sauvegarde;
}	

module.exports = vu;

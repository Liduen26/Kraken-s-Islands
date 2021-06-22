//mod de récupération du kraken

"use strict";

function kraken(req, sauvegarde) {
	let ile_centre = Math.min(sauvegarde.carte.length, sauvegarde.carte[0].length) / 6;
	let distance_centre;

	console.log("krak !");
	
	ile_centre += 0.5;

	distance_centre = Math.hypot((sauvegarde[req.headers.cookie].coordonnees.y - (sauvegarde.carte.length / 2)), (sauvegarde[req.headers.cookie].coordonnees.x - (sauvegarde.carte[0].length / 2)));
	
	if(distance_centre <= ile_centre) {
		sauvegarde[req.headers.cookie].bonus.kraken = 1;
	}

	return sauvegarde;
}

//------------------------------------------------------------------------

module.exports = kraken;

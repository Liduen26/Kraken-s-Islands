//module initilalisant tout les objet du json de sauvegarde

"use strict";

function init(req, sauvegarde) {
	
	sauvegarde[req.headers.cookie] = {};

	sauvegarde[req.headers.cookie].tour = 0;

    sauvegarde[req.headers.cookie].bateau = "";

	sauvegarde[req.headers.cookie].saboter = false;
	sauvegarde[req.headers.cookie].oeil = 0;

	//création des bonus
	sauvegarde[req.headers.cookie].bonus = {};
	sauvegarde[req.headers.cookie].bonus.espion = 2;
	sauvegarde[req.headers.cookie].bonus.oeil = 1;
	sauvegarde[req.headers.cookie].bonus.sabotage = 2;
	sauvegarde[req.headers.cookie].bonus.kraken = 0;
	sauvegarde[req.headers.cookie].bonus.barils = 4;
	sauvegarde[req.headers.cookie].bonus.bombes = []; 

	//création des stats
	sauvegarde[req.headers.cookie].stats = {}; 
	sauvegarde[req.headers.cookie].stats.pv = 0;
	sauvegarde[req.headers.cookie].stats.atq = 0;
	sauvegarde[req.headers.cookie].stats.camo = 0;
	
	//création de la zone
	sauvegarde[req.headers.cookie].zone = {};
	sauvegarde[req.headers.cookie].zone.y = 0;
	sauvegarde[req.headers.cookie].zone.x = 0;
	sauvegarde[req.headers.cookie].zone.y_p = 0;
	sauvegarde[req.headers.cookie].zone.x_p = 0;

	// Zone d'arrivée
	sauvegarde[req.headers.cookie].resultat = 0;

	sauvegarde[req.headers.cookie].a_tire = false;

	return sauvegarde;
}

//-------------------------------------------------------------------

module.exports = init;

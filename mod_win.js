// module condition de victoire
"use strict"

const fs = require ("fs");
const mod_aff = require ("./mod_aff_html");

function win (req, nom_partie) {
console.log ( " mod win ");

	let sauvegarde;
	let parties;
	let resultat;

	sauvegarde = JSON.parse (fs.readFileSync (`partie/${nom_partie}.json`,"UTF-8"));
	parties = JSON.parse(fs.readFileSync("./index_parties.json", "UTF-8"));

	// condition de victoire
	console.log("avant if");

	if (sauvegarde[req.headers.cookie].coordonnees.y === sauvegarde[req.headers.cookie].goal) {
		sauvegarde[req.headers.cookie].resultat = 1;
		console.log ("arrivée");	

    }else if (sauvegarde[req.headers.cookie].stats.pv <= 0) {
        sauvegarde[req.headers.cookie].resultat = 1;
		console.log("he's dead");
	}
	
	fs.writeFileSync (`partie/${nom_partie}.json`,JSON.stringify(sauvegarde),"UTF-8"); 
}

//----------------------------------------------------------

module.exports = win;

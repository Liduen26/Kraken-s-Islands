// module condition de victoire
"use strict"

const fs = require ("fs");
const mod_aff = require ("./mod_aff_html");
const mod_autre = require ("./mod_autre_pseudo");

function win (req, nom_partie) {
console.log ( " mod win ");

	let sauvegarde;
	let parties;
	let resultat;
	let player_1;
	let player_2;
	let i;
	let player_2 = mod_autre (req, nom_partie);

	sauvegarde = JSON.parse (fs.readFileSync (`partie/${nom_partie}.json`,"UTF-8"));
	parties = JSON.parse(fs.readFileSync("./index_parties.json", "UTF-8"));

	// condition de victoire 

	if (sauvegarde[req.headers.cookie].coordonnees.y === sauvegarde[req.headers.cookie].goal) {
		sauvegarde[req.headers.cookie].resultat = 1;
	

    }else if (sauvegarde[req.headers.cookie].stats.pv <= 0) {
        sauvegarde[req.headers.cookie].resultat = 1;
	}
	
	fs.writeFileSync (`partie/${nom_partie}.json`,JSON.stringify(sauvegarde),"UTF-8"); 
}

//----------------------------------------------------------

module.exports = win;

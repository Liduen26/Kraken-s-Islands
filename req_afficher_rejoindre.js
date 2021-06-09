//requête d'affichage de la page pour rejoindre une partie

"use strict";

const fs = require("fs");
require('remedial');

function trait(req, res, query) {

	let marqueurs;
	let page;
	let content;
	let parties = [];
	let ligne;
	let aff = [];

	// AFFICHAGE DE LA modele_formulaire_inscription

	page = fs.readFileSync('m_rejoindre_partie.html', 'utf-8');

	content = fs.readFileSync("./index_parties.json",'utf-8');
	parties = JSON.parse(content);

	for (let i = 0; i < parties.length; i++) {
		//ici faut mettre un truc pour générer de l'html et le join à la fin
	
		ligne = "";
		ligne += parties[i].partie + " | ";
		ligne += parties[i].Player_1 + " | ";

		if(parties[i].Player_2 === null) {
			ligne += "aucun | ";
		} else {
			ligne += parties[i].Player_2 + " | ";
		}

		ligne += parties[i].status_p + " | " ;

		if(parties[i].status_p === "en attente") {
			ligne += `<a href="req_rejoindre?nom_partie=${parties[i].partie}&Player_1=${parties[i].Player_1}"><button>Rejoindre</button></a></br>`;
		} else {
			ligne += "<br>";
		}
		aff.push(ligne);
	}

	aff = aff.join("");

	marqueurs = {};
	marqueurs.parties = aff;
	page = page.supplant(marqueurs);

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
}

//--------------------------------------------------------------------------

module.exports = trait;

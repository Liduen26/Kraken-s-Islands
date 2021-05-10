"use strict"

const generation = require ('./mod_gen_carte.js');
const fs = require ('fs');
const trans_html = require ('./mod_aff_html.js');

function prev_carte(req, res, query) {

	let page;
	let marqueurs = {};
	let carte = [];

	page = fs.readFileSync("m_creation_partie.html", "UTF-8");

	let hauteur = query.hauteur;
	let largeur = query.largeur;
	
	
	
	carte = generation(hauteur, largeur);

	//rentrée de la carte dans l'html
	marqueurs.carteAff = trans_html(carte,5);
	page = page.supplant(marqueurs);

	//affichage de la page html
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
	return carte;	
}
module.exports = prev_carte;

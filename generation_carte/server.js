//programme gérant un serveur local pour afficher une map sur un site

"use strict";

const http = require("http");
const url = require("url");
const fs = require("fs");

const req_statique = require("./req_statique");
const generation = require("./mod_gen_carte");
const trans_html = require("./mod_aff_html");

let mon_serveur;
let port;

function index(req, res) {
	let requete;
	let pathname;
	
	console.log("url reçue : " + req.url);
	requete = url.parse(req.url, true);
	pathname = requete.pathname;

	//gestion des requètes
	switch(pathname) {
		case '/':
		case '/req_aff':
			req_aff(req, res);
			break;
		default:
			req_statique(req, res, pathname);
			break;
	}
}

function req_aff(req, res) {
	let page;
	let marqueurs = {};
	let carte = [];

	page = fs.readFileSync("m_test_gen.html", "UTF-8");
	
	carte = generation(); 
//	console.log(carte);
	
	//rentrée de la carte dans l'html
	marqueurs.carteAff = trans_html(carte, 1);
	page = page.supplant(marqueurs);

	//affichage de la page html
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
}



//gestion du serveur local
mon_serveur = http.createServer(index);
port = 5000;
console.log("listen port " + port);
mon_serveur.listen(port);

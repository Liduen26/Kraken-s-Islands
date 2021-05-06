//programme gérant un serveur local pour afficher une map sur un site

"use strict";

const http = require("http");
const url = require("url");
const fs = require("fs");

const req_statique = require("./req_statique");
const generation = require("./mod_gen_carte");

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
	marqueurs.carteAff = trans_html(carte);
	page = page.supplant(marqueurs);

	//affichage de la page html
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
}

function trans_html(carte){
	let display = "";
	let y = 0, x;
	let color = "";
	
	//avec cette boucle on remplit le contenu de la variable display, que l'on enverra dans la page html
	while(y < carte.length) {
		x = 0;
		
		while(x < carte[y].length) {
			switch(carte[y][x]){
				case 0:
					color = "blue";
					break;
				case 1:
					color = "yellow";
					break;
				case 2:
					color = "green";
					break;
			}
			//on met dans la variable display un bout de code html, qui correspond à un carré de couleur
			//c'est tout ces carrés de couleurs assemblés qui font une carte
			display += `<span style="display: inline-flex; width: 20px; height: 20px; background-color: ${color}; margin-bottom: -5px"></span>`;
			x++;
		}
		//saut de ligne
		display += "</br>";
		y++;
	}
	
	return display;
}

//gestion du serveur local
mon_serveur = http.createServer(index);
port = 5000;
console.log("listen port " + port);
mon_serveur.listen(port);

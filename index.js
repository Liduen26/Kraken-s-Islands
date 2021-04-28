//=========================================================================
// Site WEB demo PI
// Auteurs : P. Thiré & T. Kerbrat
// Version : 09/11/2018
//=========================================================================

"use strict";

const http = require("http");
const url = require("url");
let mon_serveur;
let port;

//-------------------------------------------------------------------------
// DECLARATION DES DIFFERENTS MODULES CORRESPONDANT A CHAQUE ACTION
//-------------------------------------------------------------------------

const req_accueil = require("./req_accueil.js");
const req_credits = require("./req_credits.js");
const req_connexion = require("./req_connexion.js");
const req_inscription = require("./req_inscription.js");
const req_menu = require("./req_menu.js");

const req_statique = require("./req_statique.js");
const req_erreur = require("./req_erreur.js");

//-------------------------------------------------------------------------
// FONCTION DE CALLBACK APPELLEE POUR CHAQUE REQUETE
//-------------------------------------------------------------------------

const traite_requete = function (req, res) {

	let requete;
	let pathname;
	let query;

	console.log("URL reçue : " + req.url);
	requete = url.parse(req.url, true);
	pathname = requete.pathname;
	query = requete.query;

	// ROUTEUR

	try {
		switch (pathname) {
			case '/':
			case '/req_retour_accueil':
				req_accueil(req, res);
				break;
			case '/req_afficher_credits':
				req_credits(req, res);
				break;
			case '/req_afficher_connexion':
				req_connexion(req, res, query);
				break;
			case '/req_afficher_inscription':
				req_inscription(req, res, query);
				break;
			case '/req_identifier':
				req_menu(req, res, query);
				break;
			case '/req_deconnexion':
				req_accueil(req, res);
				break;
			default:
				req_statique(req, res, query);
				break;
		}
	} catch (e) {
		console.log('Erreur : ' + e.stack);
		console.log('Erreur : ' + e.message);
		//console.trace();
		req_erreur(req, res, query);
	}
};

//-------------------------------------------------------------------------
// CREATION ET LANCEMENT DU SERVEUR
//-------------------------------------------------------------------------

mon_serveur = http.createServer(traite_requete);
port = 5000;
//port = process.argv[2];
console.log("Serveur en ecoute sur port " + port);
mon_serveur.listen(port);

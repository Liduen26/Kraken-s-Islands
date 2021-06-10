//module de requête pour le tir du bateau

"use strict";

const fs = require("fs");
const mod_aff = require("./mod_aff.js");

function tir(req, res, query) {
	//enregister les positions où le tir à eu lieu
	//appeler le pseudo du j2
	//vérifier si la pos du j2 === un tir
	//si oui : pv - atq
	//si non : rip

	page = fs.readFileSync("m_jeu.html", "UTF-8");

	mod_aff(req, res, page, query.nom_partie);
}

//----------------------------------------------------------

module.exports = tir;

//Test de génération d'îles

"use strict"

const colors = require ("colors/safe");
const SimplexNoise = require ("simplex-noise");
const fs = require ('fs');

const affichage = require ("./mod_colors.js");
const generation = require ("./mod_gen_carte.js");


//paramètres de la carte
const hauteur = 30;
const largeur = 20;
const h_eau = 0.60;
const h_terre = 0.75;
const zoom = 0.08;
const t_ilecentre = 4;

let carte = [];

//module de génération de la carte
carte = generation (hauteur, largeur, zoom, t_ilecentre, h_eau, h_terre);
//on le met dans le fichier JSON
fs.writeFileSync("carte.json",JSON.stringify(carte),"UTF-8");

//affichage dans la console
affichage(hauteur, largeur, carte);


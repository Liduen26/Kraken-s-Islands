//Test de génération d'îles

"use strict"

const colors = require ("colors/safe");
const SimplexNoise = require ("simplex-noise");
const fs = require ('fs');

const affichage = require ("./mod_aff_console.js");
const generation = require ("./mod_gen_carte.js");


//paramètres de la carte | à changer aussi dans le module
const hauteur = 30;
const largeur = 20;

let carte = [];

//module de génération de la carte
carte = generation();
//on le met dans le fichier JSON
fs.writeFileSync("carte.json",JSON.stringify(carte),"UTF-8");

//affichage dans la console
affichage(hauteur, largeur, carte);


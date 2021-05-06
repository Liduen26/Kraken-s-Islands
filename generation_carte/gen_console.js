//Test de génération d'îles

"use strict"

const colors = require ("colors/safe");
const SimplexNoise = require ("simplex-noise");

const affichage = require ("./mod_aff_console.js");
const generation = require ("./mod_gen_carte.js");


//paramètres de la carte | à changer aussi dans le module de génération
const hauteur = 30;
const largeur = 20;

let carte = [];

//module de génération de la carte
carte = generation();

//affichage dans la console
affichage(hauteur, largeur, carte);


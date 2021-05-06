//Test de génération d'îles

"use strict"

const colors = require("colors/safe");
const SimplexNoise = require("simplex-noise");
const couleurs = require("./mod_colors.js");
const generation = require("./mod_gen_carte.js");
const hauteur = 40;
const largeur = 30;
const h_eau = 0.60;
const h_terre = 0.75;
const zoom = 0.08;
const t_ilecentre = 4;

let carte = [];
let y = 0, x = 0; // hauteur / largeur
let simplex = new SimplexNoise(Math.random);

carte = generation (hauteur, largeur, zoom, t_ilecentre);
carte = couleurs (hauteur, largeur, h_eau, h_terre, carte);

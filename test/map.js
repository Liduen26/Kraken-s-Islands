//Test de génération d'îles

"use strict"

let carte = [];
let y = 0, x = 0; // hauteur / largeur

const SimplexNoise = require("simplex-noise");

const simplex = new SimplexNoise("kraken2");
const hauteur = 30;
const largeur = 15;

for(let y = 0;y < hauteur;y++) {
	carte.push([]);

	for(let x = 0;x < largeur;x++) {
		carte[y].push(". ");
	}
}
y = 0;
x = 0;

while (y < 30) {
	x = 0;
	while(x < 15){
		process.stdout.write(carte[y][x]);
		x++;
		//console.log(3);
	}
	console.log();
	y++;
}



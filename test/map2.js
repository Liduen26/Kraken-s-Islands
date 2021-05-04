//Test de génération d'îles

"use strict"

let carte = [];
let y = 0, x = 0; // hauteur / largeur
let seed;
let elevation;

const SimplexNoise = require("simplex-noise");
let simplex = new SimplexNoise("kraken");
const hauteur = 30;
const largeur = 15;

console.log(seed = Math.floor(Math.random() * 100000) + 1);

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
		
		elevation = simplex.noise2D(x, y);
		elevation = String(elevation);
		process.stdout.write(elevation);

		x++;
		//console.log(3);
	}
	console.log();
	y++;
}
 

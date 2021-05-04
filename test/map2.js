//Test de génération d'îles

"use strict"

let carte = [];
let y = 0, x = 0; // hauteur / largeur
let seed;
let elevation;

const colors = require("colors/safe");
const kbd = require("kbd");

const SimplexNoise = require("simplex-noise");
let simplex = new SimplexNoise("kraken2");
const hauteur = 30;
const largeur = 15;
let zoom = 10;
let x_p, y_p;

/*
for(let y = 0;y < hauteur;y++) {
	carte.push([]);

	for(let x = 0;x < largeur;x++) {
		carte[y].push();
	}
}
y = 0;
x = 0;
*/

while (y < 30) {
	x = 0;
	while(x < 15){
		//process.stdout.write(carte[y][x]);
		x_p = x / zoom;
		y_p = y / zoom;
		elevation = simplex.noise2D(x_p, y_p);
		//elevation = elevation.toFixed(2);
		
		if(elevation < 0.5) {
			process.stdout.write(colors.bgBlue("  "));
		}else{
			process.stdout.write(colors.bgGreen("  "));

		}
		//process.stdout.write(colors.bgGreen.green(elevation + "  " ));

	x++;
		//console.log(3);
	}
	console.log();
	y++;
}
kbd.getLineSync();



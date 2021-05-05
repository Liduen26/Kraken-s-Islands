//Test de génération d'îles

"use strict"

let carte = [];
let y = 0, x = 0; // hauteur / largeur
let seed;
let elevation;

const colors = require("colors/safe");
const kbd = require("kbd");
const SimplexNoise = require("simplex-noise");

let simplex = new SimplexNoise(Math.random());
const hauteur = 30;
const largeur = 15;
let zoom = 10;
let x_p, y_p;


while (y < 30) {
	x = 0;

	while(x < 15){
		x_p = x / zoom;
		y_p = y / zoom;
		elevation = simplex.noise2D(x_p, y_p);
		
		
		if(elevation < 0.5) {
			process.stdout.write(colors.bgBlue("  "));
		}else{
			process.stdout.write(colors.bgGreen("  "));

		}

	x++;
	}
	console.log();
	y++;
}
kbd.getLineSync();



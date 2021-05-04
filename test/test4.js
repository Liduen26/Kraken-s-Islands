//Test de génération d'îles

"use strict"

let carte = [];
let y = 0, x = 0; // hauteur / largeur
let seed;
let elevation;

const colors = require("colors/safe");
const kbd = require("kbd");
const SimplexNoise = require("simplex-noise");

let simplex = new SimplexNoise(Math.random);
const hauteur = 30;
const largeur = 20;
const h_eau = 0.60;
const zoom = 0.1;
let x_p, y_p;
let w;

for(let y = 0;y < hauteur;y++) {
	carte.push([]);

	for(let x = 0;x < largeur;x++) {
		carte[y].push(0);
	}
}
y = 0;

while (y < hauteur/2) {
	x = 0;
	while(x < largeur){
		x_p = x * zoom;
		y_p = y * zoom;
		elevation = simplex.noise2D(x_p, y_p);
		carte[y][x] = elevation;

		if(carte[y][x] < h_eau) {
			process.stdout.write(colors.bgBlue("  "));
		}else{
			process.stdout.write(colors.bgGreen("  "));
		}
	//	console.log(carte[y][x])

		w=x*y;
		if ( w > 45 && w < 155) {
			carte[y][x] = (-(Math.pow((0.3*carte[y][x]), 2))+1);
			//carte[y][x] = Math.pow(carte[y][x]
			//console.log(carte[y][x]);
		}
		x++;
	}
	console.log();
	y++;
}
y--;
while (y > 0) {
	x = 0;
	while(x < largeur){
		if(carte[y][x] < h_eau) {
			process.stdout.write(colors.bgBlue("  "));
		}else{
			process.stdout.write(colors.bgGreen("  "));
		

		}
		x++;
	}
	console.log();
	y--;
}


//Test de génération d'îleso

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
const h_terre = 0.85;
const zoom = 0.1;
let x_p, y_p;
let w;
let dx, dy;

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
		

		dx = (largeur / 2) - x;
		dy = (hauteur / 2) - y;
		w = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
		if (w < 4.3) {
			carte[y][x] =(Math.pow(Math.cos(carte[y][x]),3)) 
			//-(Math.cos(carte[y][x],0.5))*Math.pow(carte[y][x],2)+1;       
			// (-(Math.pow((0.5*carte[y][x]), 2))+1);
			//carte[y][x] = Math.pow(carte[y][x]
			//console.log(carte[y][x])
		}

		if(carte[y][x] > h_eau && carte[y][x] < h_terre) {
			process.stdout.write(colors.bgGreen("  "));
		
		}else if (carte[y][x] > h_terre) {
			process.stdout.write(colors.rainbow("  "));
		
		}else{
			process.stdout.write(colors.bgBlue("  "));
		}
	//	console.log(carte[y][x])

		x++;
	}
	console.log();
	y++;
}
y--;
while (y > 0) {
	x = 0;
	while(x < largeur){

	if(carte[y][x] > h_eau && carte[y][x] < h_terre) {
			process.stdout.write(colors.bgGreen("  "));
		
		}else if (carte[y][x] > h_terre) {
			process.stdout.write(colors.rainbow("  "));
		
		}else{
			process.stdout.write(colors.bgBlue("  "));

		}
		x++;
	}
	console.log();
	y--;
}


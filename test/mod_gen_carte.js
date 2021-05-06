//Test de génération d'îleso

"use strict"

const SimplexNoise = require("simplex-noise");
let simplex = new SimplexNoise(Math.random);

const hauteur = 40;
const largeur = 30;
const zoom = 0.08;
const t_ilecentre = 4;

function generation(hauteur, largeur, zoom, t_ilecentre) {
	let elevation;
	let carte = [];
	let y = 0, x = 0; // hauteur / largeur
	let x_p, y_p;
	let d_centre;
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
			d_centre = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

			if (d_centre < t_ilecentre) {
				carte[y][x] = (Math.pow(Math.cos(carte[y][x]), 3));

				//-(Math.cos(carte[y][x],0.5))*Math.pow(carte[y][x],2)+1;       
				// (-(Math.pow((0.5*carte[y][x]), 2))+1);
				//carte[y][x] = Math.pow(carte[y][x]
				//console.log(carte[y][x])
			}
			x++;
		}
		y++;
	}

	return carte;
}

module.exports = generation;

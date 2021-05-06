//Test de génération d'îleso

"use strict"

const SimplexNoise = require("simplex-noise");
const simplex = new SimplexNoise(Math.random);

function generation(hauteur, largeur, zoom, t_ilecentre, h_eau, h_terre) {
	let carte = [];
	let y, x; //hauteur / largeur
	let x_p, y_p;
	let d_centre;
	let dx, dy;
	
	//mise en place du tableau en 2D
	for(y = 0;y < hauteur;y++) {	
		carte.push([]);

		for(x = 0;x < largeur;x++) {
			carte[y].push(0);
		}
	}
	y = 0;

	while (y < hauteur/2) {		//remplissage du tableau carte pour l'afficher
		x = 0;
		while(x < largeur){
			//on zoom sur la map, le x puis le y
			x_p = x * zoom;
			y_p = y * zoom;
			//génération des valeurs via le simplex-noise (bruit cohérent)
			carte[y][x] = simplex.noise2D(x_p, y_p);
			
			//Calcul via pythagore pour avoir la distance
			dx = (largeur / 2) - x;		
			dy = (hauteur / 2) - y;		
			d_centre = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
			
			//generation de l'ile centrale
			if (d_centre < t_ilecentre) {		
				carte[y][x] = (Math.pow(Math.cos(carte[y][x]), 3));
				
				/* Vieilles courbes de gen | a virer ?
				-(Math.cos(carte[y][x],0.5))*Math.pow(carte[y][x],2)+1;       
				 (-(Math.pow((0.5*carte[y][x]), 2))+1);
				carte[y][x] = Math.pow(carte[y][x]
				console.log(carte[y][x]) */
			}
			
			//changement des valeurs de 0,....... à 0, 1, ou 2
			if(carte[y][x] > h_eau && carte[y][x] < h_terre) {
				carte[y][x] = 1;
			}else if (carte[y][x] > h_terre) {
				carte[y][x] = 2;
			}
			//pas besoin de faire le 0 vu que le tableau en est rempli à son init
			x++;
		}
		y++;
	}
	
	//symétrie
	while(y < hauteur) {
		x = 0;
		while(x < largeur){
			carte[y][x] = carte[hauteur - (y + 1)][x]; 
			x++;
		}
		y++;
	}

	return carte;
}

module.exports = generation;

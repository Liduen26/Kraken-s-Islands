"use strict"

const colors = require("colors/safe");
const couleurs = function (hauteur, largeur, h_eau, h_terre, carte) {

	let y,x;
	let map = [];

	for (y = 0;y < hauteur;y++) {
        map.push([]);

        for ( x = 0;x < largeur;x++) {
            map[y].push(0);
        }
    }

	y = 0;
	while (y < hauteur/2) {
        x = 0;
        while (x < largeur){
	
 			map[y][x] = affichage (carte, map, h_eau, h_terre, y, x);
			x++;
		}
		y++;
		console.log();
	}
	y--;

	while (y >= 0) {
		x = 0;
		while (x < largeur){

			map[y][x] = affichage (carte, map, h_eau, h_terre, y, x);
			x++;
        }
        y--;
        console.log();
    }


	return map;

};

const affichage = function (carte, map2, h_eau, h_terre, y, x) {

	if (carte[y][x] > h_eau && carte[y][x] < h_terre) {
		process.stdout.write(colors.bgYellow("  "));
		map2[y][x] = 1;
	
	}else if (carte[y][x] > h_terre) {
		process.stdout.write(colors.bgGreen("  "));
		map2[y][x] = 2;
		
	}else {
		process.stdout.write(colors.bgBlue("  "));
		map2[y][x] = 0;
	}
	return map2[y][x];
};

module.exports = couleurs;


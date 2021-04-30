//Test de génération d'îles

"use strict"

let carte = [];
let y = 0, x = 0; // hauteur / largeur
let seed;
const SimplexNoise = require("simplex-noise");
let random  = new Alea(seed),
	simplex = new SimplexNoise(random),
	value2d = simplex.noise2D(30, 15);


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
 module.seed = function(seed) {
    if(seed > 0 && seed < 1) {
      // Scale the seed out
      seed *= 65536;
    }   

    seed = Math.floor(seed);
    if(seed < 256) {
      seed |= seed << 8;
    }   

    for(var i = 0; i < 256; i++) {
      var v;
      if (i & 1) {
        v = p[i] ^ (seed & 255);
      } else {
        v = p[i] ^ ((seed>>8) & 255);
      }   

      perm[i] = perm[i + 256] = v;
      gradP[i] = gradP[i + 256] = grad3[v % 12];
    }   
  };  


"use strict"

let grille = [];
let l = 0, h = 0; //largeur / hauteur  

for(let i = 0;i < 10;i++) {
	grille[i] = new Array(20);
	//console.log(1);
}

//console.log(grille);

while (h < 20) {
	l = 0;
	while(l < 10){
		grille[l][h] = ". ";
		l++;
		//console.log(2);
	}
	h++;
}

h = 0;
l = 0; 

while (h < 20) {
	l = 0;
	while(l < 10){
		process.stdout.write(grille[l][h]);
		l++;
		//console.log(3);
	}
	console.log();
	h++;
}


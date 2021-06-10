//requête affichant la page de tir

"use strict";

const fs = require("fs");

function tir(req, res, query) {
	let page;
	let sauvegarde;
	let display = [];
	let y = 0, x = 0;
	let color = "";
	let marqueurs = {};

	page = fs.readFileSync("m_tir.html", "uTF-8");
	
	sauvegarde = JSON.parse(fs.readFileSync(`partie/${query.nom_partie}.json`, "UTF-8"));

	while(y < sauvegarde.carte.length) {
        x = 0;
        display.push(`<span style="display:flex">`);
        
        while(x < sauvegarde.carte[y].length) {
            switch(sauvegarde.carte[y][x]){
                case 0:
                    color = "blue";
                    break;
                case 1:
                    color = "yellow";
                    break;
                case 2:
                    color = "green";
                    break;
                case "b": 
                    color = "brown";
            }
            //on met dans la variable display un bout de code html, qui correspond à un carré de couleur 
            //c'est tout ces carrés de couleurs assemblés qui font une carte
    		
			if(color === "blue") {
				display.push(`<input id="toggle_${y}_${x}" type="checkbox" name="check-tir" class="z-tir"/><label for="toggle_${y}_${x}" class="l-tir" style="width: 15px; height: 15px"></label>`);
			} else {
            	display.push(`<span class="${color.substring(0, 2)}" style=" width: 15px; height: 15px";></span>`);
			}

            x++;
        }
        //saut de ligne
        display.push("</span>");
        y++;
    }
	
	display = display.join("");

	marqueurs.carteAff = display;
	marqueurs.partie_query = query.nom_partie;
	page = page.supplant(marqueurs);
	
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
}

module.exports = tir;

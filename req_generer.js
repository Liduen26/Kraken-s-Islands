"use strict"

const generation = require ('./mod_gen_carte.js');
const fs = require ('fs');
function prev_carte(req, res) {

	let page;
	let marqueurs = {};
	let carte = [];

	page = fs.readFileSync("m_creation_partie.html", "UTF-8");

	carte = generation();

	//rentrée de la carte dans l'html
	marqueurs.carteAff = trans_html(carte);
	page = page.supplant(marqueurs);

	//affichage de la page html
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

	
}

function trans_html(carte){
    let display = [];
    let y = 0, x;
    let color = "";

    //avec cette boucle on remplit le contenu de la variable display, que l'on enverra dans la page html
    while(y < carte.length) {
        x = 0;

        while(x < carte[y].length) {
            switch(carte[y][x]){
                case 0:
                    color = "blue";
                    break;
                case 1:
                    color = "yellow";
                    break;
                case 2:
                    color = "green";

          }
            //on met dans la variable display un bout de code html, qui correspond à un carré de couleur
            //c'est tout ces carrés de couleurs assemblés qui font une carte
            display.push(`<span style="display: inline-flex; width: 5px; height: 5px; background-color: ${color};margin-bottom: -10px;"></span>`);

            x++;
        }
        //saut de ligne
        display.push("</br>");
        y++;
    }
    display = display.join("");

    return display;
}
module.exports = prev_carte;

//module d'affichage bateau
"use strict";
 
const fs = require("fs");
const mod_aff_html = require("./mod_aff_html");

function mod_aff(req, res, page, nom_partie) {
    
    let marqueurs = {};
    let partie;
    let x, y;

    partie = JSON.parse( fs.readFileSync(`partie/${nom_partie}.json`, "UTF-8"));

    for (y = 0; y <= partie.carte.length; y++) {
        for (x=0; x<= partie.carte[0].length; x++) {
            if (partie[req.headers.cookie].coordonnees.y === y && partie[req.headers.cookie].coordonnees.x === x) {
                partie.carte[y][x] = "b";
            }
        }
    }

    //rentrée de la carte dans l'html
    marqueurs.carteAff = mod_aff_html(partie.carte, 15);
	marqueurs.partie_query = nom_partie;
    page = page.supplant(marqueurs);

    //affichage de la page html
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
}

module.exports = mod_aff;

"use strict";

const url = require("url");
const fs = require("fs");
const mod_aff = require("./mod_aff.js");
const mod_win = require("./mod_win.js");
const mod_autre = require("./mod_autre_pseudo.js");

function bonus (req, res, query)  {
	
    let partie;
	let x, y;
    let carte;
    let page;
	let bonus;
	let espion, sabotage, oeil, barils;
	let kraken;
	let player_autre;
	let saboter;
	let faucon;

	page   = fs.readFileSync("m_jeu.html", "UTF-8");
	bonus  = query.bonus;
	player_autre = mod_autre(req, query.nom_partie);
	partie = JSON.parse (fs.readFileSync(`./partie/${query.nom_partie}.json`, "UTF-8"));

	espion = partie[req.headers.cookie].bonus.espion;
	sabotage = partie[req.headers.cookie].bonus.sabotage;
	oeil   = partie[req.headers.cookie].bonus.oeil;
	barils = partie[req.headers.cookie].bonus.barils;
	kraken = partie[req.headers.cookie].bonus.kraken;


	switch(bonus) {
		case 'espion':
			if (espion > 0) {
				espion --;
				
				partie[req.headers.cookie].tour += 1;
    			fs.writeFileSync(`./partie/${query.nom_partie}.json`, JSON.stringify(partie) ,"UTF-8");
				x = partie[player_autre].coordonnees.x;
				y = partie[player_autre].coordonnees.y;

				partie.carte[y][x] = "b";

			}
		break;

        case 'sabotage':
            if (sabotage > 0) {
                sabotage --;
				saboter = true;
				partie[player_autre].saboter = true;
				
				partie[req.headers.cookie].tour += 1;
    			fs.writeFileSync(`./partie/${query.nom_partie}.json`, JSON.stringify(partie) ,"UTF-8");
            }
        break;

        case 'oeil':
            if (oeil > 0) {
                oeil --;
    			partie[req.headers.cookie].faucon = 2;
				
				partie[req.headers.cookie].tour += 1;
				fs.writeFileSync(`./partie/${query.nom_partie}.json`, JSON.stringify(partie) ,"UTF-8");
            }
        break;

        case 'barils':
            if (barils > 0) {
                barils --;
				partie[req.headers.cookie].bonus.bombe.push = partie[req.headers.cookie].coordonnees;

				partie[req.headers.cookie].tour += 1;
    			fs.writeFileSync(`./partie/${query.nom_partie}.json`, JSON.stringify(partie) ,"UTF-8");
            }
        break;

        case 'kraken':
            if (kraken > 0) {
                kraken --;
				 partie[autre_joueur].stats.vie =- ((70*(partie[autre_joueur].stats.vie))/100);

				partie[req.headers.cookie].tour += 1;
    			fs.writeFileSync(`./partie/${query.nom_partie}.json`, JSON.stringify(partie) ,"UTF-8");
            }
        break;
		console.log (espion, sabotage, oeil, barils, kraken);
	}


    page = mod_win(req, query.nom_partie, page);
    mod_aff(req, res, page, query.nom_partie);
}


module.exports = bonus;






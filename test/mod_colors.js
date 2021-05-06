"use strict"

const couleurs = function (nb1,tab1) {

const hauteur = 40;
const largeur = 30;
const h_eau = 0.60;
const h_terre = 0.75;

y =nb1
carte[y][x] = tab1

while (y >= 0) {
    x = 0;
    while(x < largeur){

    if(carte[y][x] > h_eau && carte[y][x] < h_terre) {
        carte[y][x] = 1
        process.stdout.write(colors.bgYellow("  "));

        }else if (carte[y][x] > h_terre) {
            carte[y][x] = 2
            process.stdout.write(colors.bgGreen("  "));

        }else{
            carte[y][x] = 0
            process.stdout.write(colors.bgBlue("  "));

        }
        x++;
    }
    console.log();
    y--;
}

return carte[y][x]

};
module.exports = couleurs;

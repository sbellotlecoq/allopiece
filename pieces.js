// Récupération des pièces depuis le fichier JSON
const pieces = await fetch("pieces-autos.json").then(pieces => pieces.json());

// Fonction qui génère toute la page web
function genererPieces(pieces) {

for (let i = 0; i < pieces.length; i++) {

const article = pieces[i];
const sectionFiches = document.querySelector(".fiches");
// creation d'une balise dédiée à une piece auto
const pieceElement = document.createElement('article');
const imageElement = document.createElement("img");
imageElement.src = article.image;
const nomElement = document.createElement("h2");
nomElement.innerText = article.nom;
const prixElement = document.createElement("p");
prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
const categorieElement = document.createElement("p");
categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
const itemDescription = document.createElement("p");
itemDescription.innerText = article.description ?? "(aucune description)";
const itemStock = document.createElement("p");
itemStock.innerText = article.disponibilite ? "en stock" : "Rupture de stock";

sectionFiches.appendChild(pieceElement);
pieceElement.appendChild(imageElement);
pieceElement.appendChild(nomElement);
pieceElement.appendChild(prixElement);
pieceElement.appendChild(categorieElement);
pieceElement.appendChild(itemDescription);
pieceElement.appendChild(itemStock);
    }
}

// Premier affichage de la page
genererPieces(pieces);

// Ajout du listener pour trier les pièces par ordre de prix croissant
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
   const piecesOrdonnees = Array.from(pieces)
   piecesOrdonnees.sort(function (a, b) {
       return b.prix - a.prix;
   });
  // Effacement de l'écran et regénération de la page
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesOrdonnees);
});
 
// Ajout du listener pour filtrer les pièces non abordables
const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function () {
   const piecesFiltrees = pieces.filter(function (piece) {
       return piece.disponibilite;
   });
   // Effacement de l'écran et regénération de la page avec les pièces filtrées uniquement
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesFiltrees);
});


const inputPrixMax = document.querySelector('#prix-max')
inputPrixMax.addEventListener('input', function () { 
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= inputPrixMax.value;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
})
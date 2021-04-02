//déclaration de la variable dans laquelle on met les key et les values qui sont dans le local storage
let showproductLocalStorage = JSON.parse(localStorage.getItem('product'));
//json.parse pour convertir les données au format json qui sont dans le localStorage en objet Javascript
console.log(showproductLocalStorage);

//affichage des produits du panier
const showBasket = document.querySelector("#monpanier");
const showBasketnotempty = document.querySelector("#contenue");

//panier est vide : afficher panier vide 

if (showproductLocalStorage === null || showproductLocalStorage == 0) {
    const basketempty = `
    <div class = "panier_vide">
        <h1> le panier est vide </h1>
    </div>`;
    showBasket.innerHTML = basketempty;
} else {
    let showProductBasket = [];

    for (j = 0; j < showproductLocalStorage.length; j++) {

        showProductBasket = showProductBasket + `
        <tr >
        <td scope="row"><img class="th-img" src="${showproductLocalStorage[j].imageUrl}"></td>
        <td><h2 class ="titre-panier panierh2">${showproductLocalStorage[j].name}</h2> <h3 class ="titre-panier panierh3">${showproductLocalStorage[j].option_product}</h3></td>
        <td><h4 class ="titre-panier panierh4">${showproductLocalStorage[j].price}€</h4></td>
        <td>${showproductLocalStorage[j].quantity}</td>
        <td class ="delete"><button class = "btn btn-primary btn-delete "><i class="fas fa-trash-alt"></i></button></td>
    </tr>
        `;
    }
    if (j == showproductLocalStorage.length) {
        showBasketnotempty.innerHTML = showProductBasket;

    }


}

// gestion bouton supression article


// récupérer l'id des produits et les options couleurs
// SI l'id et option couleur strictement égale il faut incrémenter la quantité de +1 a chaque fois
// function + onclick si valeur quantité n'est pas zero alors value quantité ++ 
//new - function onclick si value quantité plus que 0 value --
// ecoute bouton supprimé pour supprimer produit tableau 

const btn_delete = document.querySelectorAll(".btn-delete");

for (let k = 0; k < btn_delete.length; k++) {
    btn_delete[k].addEventListener("click", (event) => {
        event.preventDefault();

        let id_select_delete = showproductLocalStorage[k].id;
        let color_select_delete = showproductLocalStorage[k].option_product;
        console.log('id_select_delete');
        console.log(id_select_delete);
        showproductLocalStorage = showproductLocalStorage.filter(element => element.id !== id_select_delete);
        console.log(showproductLocalStorage);

        localStorage.setItem("product", JSON.stringify(showproductLocalStorage));
        alert("Produit Retirer de votre panier");
        window.location.href = "panier.html";
    });
}

// price égale quantité fois prix
// Sous total = +eachprix
let teddyPrice = JSON.parse(localStorage.getItem('product'));

let total = function calculTotal() {
        let teddyPriceArr = [];
        for (l = 0; l < teddyPrice.length; l++) {
            teddyPriceArr.push(teddyPrice[l].price);

        }
        let totalAmount = teddyPriceArr.reduce((total, current) => total + current, 0);
        return totalAmount;

    }
    ();

localStorage.setItem('total', total);
const sousTotal = document.querySelector(".sous_Total");
sousTotal.innerHTML = total + " €";
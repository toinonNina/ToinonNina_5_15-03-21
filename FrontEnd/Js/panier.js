//déclaration de la variable dans laquelle on met les key et les values qui sont dans le local storage
let showproductLocalStorage = JSON.parse(localStorage.getItem('product'));
//json.parse pour convertir les données au format json qui sont dans le localStorage en objet Javascript
console.log(showproductLocalStorage);

//affichage des produits du panier
const showBasket = document.querySelector("#monpanier");
const showBasketnotempty = document.querySelector("#contenue");
console.log(showBasket);
//panier est vide : afficher panier vide 

if (showproductLocalStorage === null) {
    const basketempty = `
    <div class = "panier_vide">
        <h1> le panier est vide </h1>
    </div>`;
    showBasket.innerHTML = basketempty;
} else {
    let showProductBasket = [];
    for (j = 0; j < showproductLocalStorage.length; j++) {

        showProductBasket = showProductBasket + `
        <tr>
        <td scope="row"><img class="th-img" src="${showproductLocalStorage[j].imageUrl}"></td>
        <td>${showproductLocalStorage[j].name}</td>
        <td>${showproductLocalStorage[j].option_product}</td>
        <td>${showproductLocalStorage[j].price}€</td>
    </tr>
        `;
    }
    if (j == showproductLocalStorage.length) {
        showBasketnotempty.innerHTML = showProductBasket;
    }
}
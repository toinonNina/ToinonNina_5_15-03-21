//déclaration de la variable dans laquelle on met les key et les values qui sont dans le local storage
let showproductLocalStorage = JSON.parse(localStorage.getItem('product'));
//json.parse pour convertir les données au format json qui sont dans le localStorage en objet Javascript

//affichage des produits du panier
const showBasket = document.querySelector("#monpanier");
const showBasketnotempty = document.querySelector("#contenue");

//panier est vide : afficher panier vide 
function showProductsBasket() {
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
                <td scope="row"><a href="produit.html?id=${showproductLocalStorage[j].id}">
                    <img class="th-img" src="${showproductLocalStorage[j].imageUrl}"></a></td>
                <td><h2 class ="titreNom panierh2">${showproductLocalStorage[j].name}</h2><h3 class="colortitle"> ${showproductLocalStorage[j].option_product}</h3></td>
                
                <td><h4 class="titre-panier panierh4">${showproductLocalStorage[j].price}€</h4></td >
                    <td class="delete"><button class="btn btn-primary btn-delete "><i class="fas fa-trash-alt"></i></button></td>
            </tr >
                `;

            const sousTotal = document.querySelector(".sous_Total");
            sousTotal.innerHTML = calculTotal() + " €";

        }
        if (j == showproductLocalStorage.length) {
            showBasketnotempty.innerHTML = showProductBasket;
        }



    }
};
showProductsBasket();


// SI l'id et option couleur strictement égale il faut incrémenter la quantité de +1 a chaque fois
//<td><div class="counter"><div class ="down" > - </div><input class="quantitytext" type="text" value="${showproductLocalStorage[j].quantity}"><div class="up"> + </div></div></td>
/*const iconPlus = document.querySelectorAll(".up");
const iconLess = document.querySelectorAll(".down");
var input = document.querySelectorAll(".quantitytext");

console.log(iconPlus);
console.log(input);
console.log(iconLess);

function plusQuantity() {
    for (m = 0; m < iconPlus.length; m++) {
        iconPlus[m].onclick = function increaseCount(e) {
            e.preventDefault();
            e.stopPropagation();
            value = isNaN(value) ? 0 : value;
            var value = parseInt(input.value, 10);
            value++;
            input.value = value;
        };
    };
};
plusQuantity();

function lessQuantity() {
    iconLess.onclick = function decreaseCount(e) {
        e.preventDefault();
        e.stopPropagation();

        var value = parseInt(input.value, 10);
        if (value > 1) {
            value = isNaN(value) ? 0 : value;
            value--;
            input.value = value;
        }
    };
};

lessQuantity();*/



// ecoute bouton supprimé pour supprimer produit tableau 

const btn_delete = document.querySelectorAll(".btn-delete");

function deleteProduct() {
    for (let k = 0; k < btn_delete.length; k++) {

        btn_delete[k].addEventListener("click", (event, index) => {
            event.preventDefault();
            event.stopPropagation();
            index = [k];
            showproductLocalStorage.splice(index, 1);
            alert(`L'ourson a été retirer de votre panier`);
            localStorage.setItem("product", JSON.stringify(showproductLocalStorage));
            window.location.reload();
        });
    }
};
deleteProduct();





// price égale quantité fois prix

// Sous total = +eachprix


function calculTotal() {
    let teddyPriceArr = [];
    for (l = 0; l < showproductLocalStorage.length; l++) {
        teddyPriceArr.push(showproductLocalStorage[l].price);
    }
    let totalAmount = teddyPriceArr.reduce((total, current) => total + current, 0);
    return totalAmount;
};
// vider le panier avec clear localStorage
const btnDeleteAllProduct = document.querySelector('.allDelete');


function deleteAll() {
    btnDeleteAllProduct.onclick = function(event) {
        event.preventDefault();
        event.stopPropagation();
        localStorage.removeItem('product');
        alert("Le panier a été vidé");
        window.location.reload();
    };
}
deleteAll();
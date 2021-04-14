let cartItems = localStorage.getItem("productsInCart");
cartItems = JSON.parse(cartItems);
let productContainer = document.querySelector("#contenue");
let cart = localStorage.getItem("totalCost");
const showBasket = document.querySelector("#monpanier");


function displayCart() {

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {

            productContainer.innerHTML += `
             <tr >
                 <td scope="row"><a href="produit.html?id=${item.id}">
                     <img class="th-img" src="${item.imageUrl}"></a></td>
                 <td><h2 class ="titreNom panierh2">${item.name}</h2><h3 class="colortitle"> ${item.option_product}</h3></td>
                 <td><div class="counter"><span class="quantitytext" id="${item.id}">${item.quantity}</span></div></td>
                 <td><h4 class="titre-panier panierh4">${item.quantity * item.price}€</h4></td>
                     
             </tr >
                 `;
            const sousTotal = document.querySelector(".sous_Total");
            sousTotal.innerHTML = `${cart} €`;
        });
    }
    if (cartItems === null || cartItems == 0) {
        const basketempty = `
     <div class = "panier_vide">
         <h1> le panier est vide </h1>
     </div>`;
        showBasket.innerHTML = basketempty;

    }

}
displayCart();













deleteAll();
onloadCartNumbers();
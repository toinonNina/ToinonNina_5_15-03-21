const url = "http://localhost:3000/api/teddies";


// fonction pour afficher les option de couleur en liste.
function showOptionColor(colors) {
    let optionColor = '';
    for (let i = 0, size = colors.length; i < size; i++) {
        optionColor += ` <option>${(colors[i])}</option>`;
    }
    return optionColor;
};

// création variable qui récupère l'id choisis dans la selection produit dans l'index
const params = new URLSearchParams(window.location.search);
var teddieId = params.get("id");

var myProduct;

//fonction fenètre popup 
const popConfirmation = () => {
    if (window.confirm(`${myProduct.name} a bien été ajouté au panier consultez le panier OK où revenir à l'accueil ANNULER`)) {
        window.location.href = "panier.html";
    } else {
        window.location.href = "index.html";
    }
};

function onloadCartNumbers() { // pour garder le nombre mis dans le localstorage afficher sur chaque page
    let productNumber = localStorage.getItem("cartNumbers");
    if (productNumber) {
        document.querySelector(".spannumber").textContent = productNumber;
    }
}

function cartNumbers(productObjet) { // compte le nombre de produit a ajouter dans le localstrorage et a afficher sur le span panier

    let productNumber = localStorage.getItem("cartNumbers");
    productNumber = parseInt(productNumber);
    if (productNumber) {
        localStorage.setItem("cartNumbers", productNumber + 1);
        document.querySelector(".spannumber").textContent = productNumber + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector(".spannumber").textContent = 1;
    }
    setItems(productObjet);
}


function setItems(productObjet) { // ajouter donnée produit dans le localstorage

    cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {
        if (cartItems[productObjet.name] == undefined) {
            cartItems = {
                ...cartItems,
                [productObjet.name]: productObjet
            };


        }
        cartItems[productObjet.name].quantity += 1;

    } else {
        productObjet.quantity = 1;
        cartItems = {
            [productObjet.name]: productObjet
        };
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

}

function totalCost(product) {
    let cart = localStorage.getItem("totalCost");

    if (cart != null) {

        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart + product.price);

    } else {
        localStorage.setItem("totalCost", product.price);
    }
}


function deleteAll() {
    const btnDeleteAllProduct = document.querySelector('.allDelete');
    if (cartItems === null || cartItems == 0) {
        displayCart();;
    } else {
        btnDeleteAllProduct.onclick = function(event) {
            event.preventDefault();
            event.stopPropagation();
            localStorage.removeItem('productsInCart');
            localStorage.removeItem('cartNumbers');
            localStorage.removeItem('totalCost');
            alert("Le panier a été vidé");
            window.location.reload();
        };
    };
};
const url = "http://localhost:3000/api/teddies";



// fonction pour afficher les option de couleur en liste.
function showOptionColor(colors) {
    let optionColor = '';
    for (let i = 0, size = colors.length; i < size; i++) {
        optionColor += ` <option value="${(colors[i])}" >${(colors[i])}</option>`;
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

// vider le panier avec clear localStorage
const btnDeleteAllProduct = document.querySelector('.allDelete');
// ecoute bouton supprimé pour supprimer produit tableau
function deleteAll() {
    btnDeleteAllProduct.onclick = function(event) {
        event.preventDefault();
        event.stopPropagation();
        localStorage.removeItem('product');
        alert("Le panier a été vidé");
        window.location.reload();
    };
}
// Affichage quantité du panier dans le menu de navigation de chaque page. 
function AddNumber() {
    let numberArticle = document.getElementById("spannumber");
    let number = 0;
    // si le  localStorage n'est pas vide , on récupère  les données , et on boucle la somme de chaque quantité des données du localstorage
    if (localStorage.getItem('product') !== null) {
        let keynumber = JSON.parse(localStorage.getItem('product'));
        keynumber.forEach((products) => {
            number = number + products.quantity;
        });
        // insertion dans le HTML
        numberArticle.innerHTML = number;
    }
}
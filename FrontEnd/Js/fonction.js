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
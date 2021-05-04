const url = "http://localhost:3000/api/teddies";
let products = [];
/* _________________________________________ fiche produit___________________________________________________*/
// création variable qui récupère l'id choisis dans la selection produit dans l'index
const params = new URLSearchParams(window.location.search);
var teddieId = params.get("id");
var myProduct;
/* _________________________________________ gestion couleur___________________________________________________*/
// fonction pour afficher les option de couleur en liste.
function showOptionColor(colors) {
    let optionColor = '';
    for (let i = 0, size = colors.length; i < size; i++) {
        optionColor += ` <option value="${(colors[i])}" >${(colors[i])}</option>`;
    }
    return optionColor;
};
/* _________________________________________ confirmation mis dans le panier___________________________________________________*/
//fonction fenètre popup de confirmation de mise dans le panier
const popConfirmation = () => {
    if (window.confirm(`${myProduct.name} a bien été ajouté au panier consultez le panier OK où revenir à l'accueil ANNULER`)) {
        window.location.href = "panier.html";
    } else {
        window.location.href = "index.html";
    }
};
/* _________________________________________ Vider le panier___________________________________________________*/
// vider le panier avec clear localStorage
const btnDeleteAllProduct = document.querySelector('.allDelete');
// ecoute bouton supprimé pour supprimer produit tableau
function deleteAll(deletebutton) {
    deletebutton.onclick = function(event) {
        event.preventDefault();
        event.stopPropagation();
        localStorage.removeItem('product');
        alert("Le panier a été vidé");
        window.location.reload();
    };
}
/* _________________________________________ quantité produit___________________________________________________*/
// Affichage quantité du panier dans le menu de navigation de chaque page. 
function showQuantity(datas) {
    let numberArticle = document.getElementById("spannumber");

    let number = 0;
    // si le  localStorage n'est pas vide , on récupère  les données , et on boucle la somme de chaque quantité des données du localstorage
    if (datas !== null) {
        let keynumber = JSON.parse(datas);
        keynumber.forEach((products) => {
            number = number + products.quantity++;
        });
        // insertion dans le HTML

    }
    numberArticle.innerHTML = number + " produits";
}
// injection html quantité
function showStructureQuantity(positionQuantity) {
    if (positionQuantity) {
        const structurequantity = `
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>`;
        positionQuantity.innerHTML = structurequantity;
    } else {
        console.log(error);
    }
} /* _________________________________________ FIN quantité produit___________________________________________________*/
/* _________________________________________ gestion du formulaire___________________________________________________*/


// formule regexp

const regExControlName = (value) => {
    return /^[A-Za-z-àâäéèêëïîôöùûüç]{2,15}$/.test(value);
};
const regExControlPostal = (value) => {
    return /^[0-9]{5}$/.test(value);
};
const regExControlAdress = (value) => {
    return /^[a-zA-Z0-9\s-,áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{5,60}$/.test(value);
};
const regExControlCity = (value) => {
    return /^[a-zA-Z0-9\s-,áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{5,20}$/.test(value);
};
const regExControlEmail = (value) => {
    return /^[\w-.]+@([\w-]+.)+[\w-]{2,}$/g.test(value);

};



//controle des value formulaire
function firstNameControle(regexName) {
    if (regexName) {
        return true;
    } else {
        const alertFirstName = document.querySelector("#alerteprenom");
        alertFirstName.innerHTML = "Le champs du formulaire doit contenir que des lettres \n Il doit contenir un minimum de 2 caractères jusqu'à 15 caractères";
        return false;
    }
}

function lastNameControle(regexLastName) {

    if (regexLastName) {
        return true;
    } else {
        const alertLastName = document.querySelector("#alertenom");
        alertLastName.innerHTML = "Le champs du formulaire doit contenir que des lettres \n Il doit contenir un minimum de 2 caractères jusqu'à 15 caractères";
        return false;
    }
}

function emailControle(regexEmail) {

    if (regexEmail) {
        return true;
    } else {
        const alertEmail = document.querySelector("#alertemail");
        alertEmail.innerHTML = "Adresse Email non Valide";
        return false;
    }
}

function adressControle(regexAdress) {

    if (regexAdress) {
        return true;
    } else {
        const alertAdress = document.querySelector("#alerteadress");
        alertAdress.innerHTML = "vérifier le champs adresse";

        return false;

    }
}

function cityControle(regexCity) {

    if (regexCity) {
        return true;
    } else {
        const alertCity = document.querySelector("#alerteville");
        alertCity.innerHTML = "vérifier le champs de la ville ";
        return false;
    }
}
/* _________________________________________  FIN gestion du formulaire___________________________________________________*/
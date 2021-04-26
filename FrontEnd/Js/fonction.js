const url = "http://localhost:3000/api/teddies";


// création variable qui récupère l'id choisis dans la selection produit dans l'index
const params = new URLSearchParams(window.location.search);
var teddieId = params.get("id");
var myProduct;

// fonction pour afficher les option de couleur en liste.
function showOptionColor(colors) {
    let optionColor = '';
    for (let i = 0, size = colors.length; i < size; i++) {
        optionColor += ` <option value="${(colors[i])}" >${(colors[i])}</option>`;
    }
    return optionColor;
};

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
function deleteAll(deletebutton) {
    deletebutton.onclick = function(event) {
        event.preventDefault();
        event.stopPropagation();
        localStorage.removeItem('product');
        alert("Le panier a été vidé");
        window.location.reload();
    };
}
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
    numberArticle.innerHTML = number;
}

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
}

function AddForm(form) {
    if (form) {
        form.innerHTML = `
    <h2 class ="titreNom titreformulaire">Formulaire de commande</h2>
    
    <form class="formulairecentrer">
    <div class="form-row ">
        <div class="col-md-4 mb-3">
            <label for="prenom">Prénom</label>
            <input type="text" class="form-control" id="prenom" placeholder="Prénom" required>
            <div id="alerteprenom" class ="alertspan"></div>
        </div>
        <div class="col-md-4 mb-3">
            <label for="nom">Nom</label>
            <input type="text" class="form-control" id="nom" placeholder="Nom" required>
            <div id="alertenom" class ="alertspan"></div>
        </div>
        <div class="col-md-4 mb-3">
            <label for="email">Email</label>
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="test">@</span>
                </div>
                <input type="text" class="form-control" id="email" placeholder="adresse Email" required>
            </div>
            <div id="alertemail" class ="alertspan"></div>
        </div>
    </div>
    <div class="form-row">
        <div class="form-group col-md-6">
            <label for="inputAddress">Address</label>
            <input type="text" class="form-control" id="inputAddress" placeholder="adresse" required>
           <div id="alerteadress" class ="alertspan"></div>
        </div>
        <div class="col-md-4 mb-2">
            <label for="ville">Ville</label>
            <input type="text" class="form-control" id="ville" placeholder="Code postal et ville" required>
            <div id="alerteville" class ="alertspan"></div>
        </div>
        
    </div>
    
    <p class="btn-commande btn-primary commande">Passer Commande</p>
  </form>`;
    } else { console.log("erreur de chargement"); }
}

let products = [];

// gestion du formulaire

const regExControlName = (value) => {
    return /^[A-Za-z-àâäéèêëïîôöùûüç]{2,15}$/.test(value);
};
const regExControlPostal = (value) => {
    return /^[0-9]{5}$/.test(value);
};
const regExControlEmail = (value) => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
};
const regExControlAdress = (value) => {
    return /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]{5,60}$/.test(value);
};
const regExControlCity = (value) => {
    return /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]{5,50}$/.test(value);
};


//controle des value formulaire
function firstNameControle(regexName) {
    if (regexName) {
        return true;
    } else {
        const alertFirstName = document.querySelector("#alerteprenom");
        alertFirstName.innerHTML = "Le champs du formulaire doit contenir que des lettres \n Il doit contenir un minimum de 2 caractères jusqu'a 15 caractères";
        return false;
    }
}

function lastNameControle(regexLastName) {

    if (regexLastName) {
        return true;
    } else {
        const alertLastName = document.querySelector("#alertenom");
        alertLastName.innerHTML = "Le champs du formulaire doit contenir que des lettres \n Il doit contenir un minimum de 2 caractères jusqu'a 15 caractères";
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
        alertAdress.innerHTML = "verifier le champs adresse";

        return false;

    }
}

function cityControle(regexCity) {

    if (regexCity) {
        return true;
    } else {
        const alertCity = document.querySelector("#alerteville");
        alertCity.innerHTML = "verifier le champs de la ville ";
        return false;
    }
}
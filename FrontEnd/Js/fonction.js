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

function AddForm() {
    const form = document.querySelector("#formulaire");
    form.innerHTML = `
    <h2 class ="titreNom titreformulaire">Formulaire de commande</h2>
    
    <form class="formulairecentrer">
    <div class="form-row ">
        <div class="col-md-4 mb-3">
            <label for="prenom">Prénom</label>
            <input type="text" class="form-control" id="prenom" placeholder="First name" required>
        </div>
        <div class="col-md-4 mb-3">
            <label for="nom">Nom</label>
            <input type="text" class="form-control" id="nom" placeholder="Last name" required>
        </div>
        <div class="col-md-4 mb-3">
            <label for="email">Email</label>
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="test">@</span>
                </div>
                <input type="text" class="form-control" id="email" placeholder="Username" required>
            </div>
        </div>
    </div>
    <div class="form-row">
        <div class="form-group col-md-6">
            <label for="inputAddress">Address</label>
            <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" required>
        </div>
        <div class="col-md-4 mb-2">
            <label for="ville">Ville</label>
            <input type="text" class="form-control" id="ville" placeholder="City" required>
        </div>
        <div class="col-md-3 mb-3">
            <label for="postal">Code Postal</label>
            <input type="text" class="form-control" id="postal" placeholder="State" required>
        </div>
    </div>
    
    <p class="btn btn-primary commande">Passer Commande</p>
  </form>`;
}
//type="submit"
let product_Id = [];
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
    return /^[A-Za-z-àâäéèêëïîôöùûüç]{5,50}$/.test(value);
};
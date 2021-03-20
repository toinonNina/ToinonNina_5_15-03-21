// création variable qui récupère l'id choisis dans la selection produit dans l'index
const params = new URLSearchParams(window.location.search);
var teddieId = params.get("id");

//fonction qui récupère bien les donnée API du produit selectionné.
var productSelection = async () => {
    await fetch(url + "/" + teddieId).then(function (response) {
        response.json().then(function (data) {
            myProduct = data;
            var teddie;
            //on y inclus le html pour l'afficher en y incluant la fonction pour les options
            monproduit.innerHTML =
                `<div class="card card-product">
            <img class="card-img-top product-img" src="${myProduct.imageUrl}" />
            <div class="card-body product-body">
                <h2 class="card-title name">${myProduct.name}</h2>
                <p class="card-text price">${myProduct.price / 100} €</p>
                <p class="card-text description">${myProduct.description}</p> 
                <select name="colors" id="colors">
                ${this.showOptionColor(myProduct.colors)}
          </select>
          <a href="produit.html?id=" class="btn btn-primary">Ajouter au Panier</a>
            </div>
        </div>
        `;
        });


    });
};






productSelection();



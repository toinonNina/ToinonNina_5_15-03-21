//fonction qui récupère bien les donnée API du produit selectionné.

fetch(url + "/" + teddieId).then(function(response) {
    response.json().then(function(data) {
        myProduct = data;

        //on y inclus le html pour l'afficher en y incluant la fonction pour les options
        monproduit.innerHTML =
            `<div class="card card-product">
                    <img class="card-img-top product-img" src="${myProduct.imageUrl}" />
                    <div class="card-body product-body">
                        <h2 class="card-title name">${myProduct.name}</h2>
                        <p class="card-text price">${myProduct.price / 100} €</p>
                        <p class="card-text description">${myProduct.description}</p>
                        <form>
                            <label for="option_product">Couleur :  </label>
                            <select name="colors" id="colors">
                           ${this.showOptionColor(myProduct.colors)}
                            </select>                          
                        </form>
                        <button class="btn btn-primary myBtn" >Ajouter au Panier</button>
                    </div>
                </div>
        `;

        // sélection du bouton ajouter l'article au panier
        const btn = document.querySelector('.myBtn');

        // écouter le bouton et envoyer le panier 
        btn.onclick = function(event) {
            event.preventDefault();
            event.stopPropagation();
            //appel de la fonction pour ajouter les produits dans le localStorage
            addItemCart(myProduct);


        };
    });
});


function addItemCart(item) {

    // variable
    let showproductLocalStorage = [];
    const idColors = document.querySelector("#colors");
    const choixColors = idColors.value;
    // stockage des données dont j'aurai besoin dans le localStorage dans un objet
    let productObjet = {
        _id: item._id,
        imageUrl: item.imageUrl,
        name: item.name,
        price: item.price,
        quantity: 1,
        selectColors: choixColors,
    };
    let otherItem = true;
    // Si localStorage est vide  créer un nouveau tableau showproductLocalStorage et l'enregistre dans le localStorage
    if (localStorage.getItem('product') === null) {
        showproductLocalStorage.push(productObjet);
        localStorage.setItem('product', JSON.stringify(showproductLocalStorage));
    }
    // Sinon elle récupère le tableau du localStorage, ajoute le nouveau produit, et enregistre le nouveau tableau.
    else {
        showproductLocalStorage = JSON.parse(localStorage.getItem('product'));

        showproductLocalStorage.forEach((product) => {
            //si l'id et la color sont égale on incrémente la quantité au lieu d'affiché une nouvelle ligne dans le tableau
            if (item._id === product._id && choixColors === product.selectColors) {
                product.quantity++;
                otherItem = false;
            }
        });
        //si otherItem est trus on push les donnée dans le tableau et on enregistre dans le localStorage
        if (otherItem) showproductLocalStorage.push(productObjet);
        localStorage.setItem('product', JSON.stringify(showproductLocalStorage));
    }
    // fonction qui active une popup pour permettre a l'utilisation de naviguer soit au panier soit de retourner a la page accueil
    popConfirmation();
}
//fonction qui affiche dans le span la quantité d'article
AddNumber();
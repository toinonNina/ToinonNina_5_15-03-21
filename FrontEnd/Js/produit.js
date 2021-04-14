//fonction qui récupère bien les donnée API du produit selectionné.
var productSelection = async() => {
    await fetch(url + "/" + teddieId).then(function(response) {
        response.json().then(function(data) {
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
                        <form>
                            <label for="option_product">Couleur :  </label>
                            <select name="colors" id="colors">
                            ${this.showOptionColor(myProduct.colors)}
                            </select>
                        </form>
                        <button class="btn btn-primary myBtn">Ajouter au Panier</button>
                    </div>
                </div>
        `;
            //Gestion du panier
            // récupération des données sélectionnées par l'utilisateur et envoie du panier
            const idColors = document.querySelector("#colors"); //selection de les options du formulaire
            const btn = document.querySelector('.myBtn'); // sélection du bouton ajouter l'article au panier

            btn.onclick = function(event) { // écouter le bouton et envoyer le panier 
                event.preventDefault();
                event.stopPropagation();
                const choixColors = idColors.value;
                var productObjet = {
                    //mettre le choix de l'utilisateur dans une variable
                    id: myProduct._id,
                    name: myProduct.name,
                    option_product: choixColors,
                    price: myProduct.price / 100,
                    imageUrl: myProduct.imageUrl,
                    quantity: 0,

                };
                cartNumbers(productObjet);
                totalCost(productObjet);
                popConfirmation();


            };


        });
    });
};
productSelection();
onloadCartNumbers();
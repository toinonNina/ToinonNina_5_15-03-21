// création variable qui récupère l'id choisis dans la selection produit dans l'index
const params = new URLSearchParams(window.location.search);
var teddieId = params.get("id");
var myProduct;

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

            //selection de les options du formulaires
            const idColors = document.querySelector("#colors");

            // sélection du bouton ajouter l'article au panier
            const btn = document.querySelector('.myBtn');

            // écouter le bouton et envoyer le panier 
            btn.onclick = function(event) {
                event.preventDefault();
                event.stopPropagation();
                //mettre le choix de l'utilisateur dans une variable

                const choixColors = idColors.value;
                console.log(choixColors);
                var productObjet = {
                    id: myProduct._id,
                    name: myProduct.name,
                    option_product: choixColors,
                    price: myProduct.price / 100,
                    imageUrl: myProduct.imageUrl,
                    quantity: 1,
                };

                //déclaration de la variable dans laquelle on met les key et les values qui sont dans le local storage
                let showproductLocalStorage = JSON.parse(localStorage.getItem('product'));
                //json.parse pour convertir les données au format json qui sont dans le localStorage en objet Javascript



                //fonction ajouter un produit sélectionné dans le localStorage 

                const addProducLocalStorage = () => {

                    //ajout dans le tableau de l'objet avec les value choisi par l'utilisateur

                    showproductLocalStorage.push(productObjet);

                    // tranforme en JSON et l'envoye dans la clé product du localStorage

                    localStorage.setItem("product", JSON.stringify(showproductLocalStorage));
                };
                //s'il y a deja des prduits enregistré dans le local storage

                if (showproductLocalStorage) {
                    addProducLocalStorage();
                    console.log(showproductLocalStorage);
                    popConfirmation();
                }
                // s'il n'y a pas de produit d'enregistré dans le local storage
                else {
                    showproductLocalStorage = [];
                    addProducLocalStorage();
                    console.log(showproductLocalStorage);
                    popConfirmation();
                }
            };
        });
    });
};
productSelection();
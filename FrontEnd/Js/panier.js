//affichage des produits du panier
// variable a déclarer
const showBasket = document.querySelector("#monpanier");
const showBasketnotempty = document.querySelector("#contenue");




// Contenu du panier
function productBasket() {
    // si le LocalStorage  n'est pas vide l'afficher 
    if (localStorage.getItem('product') !== null) {

        let showProductBasket = JSON.parse(localStorage.getItem('product'));
        let total = 0;
        //initialisation du total à 0
        let html = "";
        // Affichage des articles + prix + quantité +  selection de couleur + button de supression 
        showProductBasket.forEach((product) => {

            html += `
            <tr >
                <td scope="row"><a href="produit.html?id=${product._id}">
                    <img class="th-img" src="${product.imageUrl}"></a></td>
                <td><h2 class ="titreNom panierh2 nametitre">${product.name}</h2><h3 class="colortitle"> ${product.selectColors}</h3></td>
                <td><h2 class ="titreNom panierh2">${product.quantity}</h2></td>
                <td><h4 class="titre-panier panierh4">${(product.price / 100) * product.quantity}  €</h4></td >
                
            </tr >
                `;
            document.querySelector("#contenue").innerHTML = html;
            // calcul du prix total en prenant en compte la quantité de produits
            total = total + ((product.price / 100) * product.quantity);
            const sousTotal = document.querySelector(".sous_Total");
            //insertion dans le HTML déja présent
            sousTotal.innerHTML = total + " €";


        });

    }

    // si le LocalStorage est par contre vide, afficher que le panier est vide
    else {
        const basketempty = `
        <div class = "panier_vide">
            <h1> le panier est vide </h1>
        </div>`;
        //insertion du message
        showBasket.innerHTML = basketempty;
        window.location.href = "index.html";

    }


}
productBasket();
AddNumber();
deleteAll();
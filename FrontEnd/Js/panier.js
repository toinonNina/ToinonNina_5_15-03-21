//affichage des produits du panier
// variable a déclarer
const showBasket = document.querySelector("#monpanier");
const showBasketnotempty = document.querySelector("#contenue");
let items = JSON.parse(localStorage.getItem('product'));
let total = 0;


// Contenu du panier
function productBasket(productls) {
    // si le LocalStorage  n'est pas vide l'afficher 
    if (productls !== null) {
        //initialisation du total à 0
        let html = "";
        // Affichage des articles + prix + quantité +  selection de couleur + button de supression 
        items.forEach((product) => {

            html += `
            <tr >
                <td scope="row"><a href="produit.html?id=${product._id}">
                    <img class="th-img" src="${product.imageUrl}" alt="${product.name}"></a></td>
                <td><h2 class ="titreNom panierh2 nametitre">${product.name}</h2><h3 class="colortitle"> ${product.selectColors}</h3></td>
                <td><h2 class ="titreNom panierh2">${product.quantity}</h2></td>
                <td><h2 class="titre-panier panierh4">${(product.price / 100) * product.quantity}  €</h2></td >               
            </tr >
                `;
            document.querySelector("#contenue").innerHTML = html;
            // calcul du prix total en prenant en compte la quantité de produits
            total = total + ((product.price / 100) * product.quantity);
            const sousTotal = document.querySelector(".sous_Total");
            //insertion dans le HTML déja présent
            sousTotal.innerHTML = total + " €";
            AddForm(document.querySelector("#formulaire"));
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
productBasket(localStorage.getItem('product'));
showQuantity(localStorage.getItem('product'));
//AddNumber(localStorage.getItem('product'));
deleteAll(btnDeleteAllProduct);

const btnSendForm = document.querySelector(".commande");

// gestion validation du formulaire

// Si le localstorage n'est pas vide, récupérer l'id des produits dans un nouveau tableau
function showForm(formls) {
    if (formls !== null) {
        btnSendForm.addEventListener("click", (event) => {
            // objet qui récupère les values du formulaires une fois remplus

            event.preventDefault;
            let contact = {
                firstName: document.querySelector("#prenom").value,
                lastName: document.querySelector("#nom").value,
                address: document.querySelector("#inputAddress").value,
                city: document.querySelector("#ville").value,
                email: document.querySelector("#email").value,
            };
            let productLocal = JSON.parse(localStorage.getItem('product'));

            // parcourir tableau du localstorage pour lire et récupérer chaque id
            productLocal.forEach(dataId => {
                products.push(dataId._id);
            });

            //controle formulaire avant envoie dans le localstorage  
            const firstName = contact.firstName;
            const lastName = contact.lastName;
            const email = contact.email;
            const adress = contact.adress;
            const city = contact.city;
            // si le controle est true alors setItem dans le localstorage. sinon alert remplir le formulaires
            if (firstNameControle(regExControlName(firstName)) && lastNameControle(regExControlName(lastName)) &&
                emailControle(regExControlEmail(email)) && adressControle(regExControlAdress(adress)) && cityControle(regExControlCity(city))) {
                localStorage.setItem("formulaire", JSON.stringify(contact));

                // variable qui réunis les données a envoyé au serveur, les id des produits présent dans le panier, et les donnnées du formulaire récupérer dans le localStorage
                const dataSubmit = JSON.stringify({
                    products,
                    contact,
                });
                console.log(dataSubmit);
                // envoie de l'objet dans le server
                postOrder(dataSubmit);
            };
        });
    };
}
showForm(localStorage.getItem('product'));

function postOrder(dataSubmit) {

    // on utilise fetch qui retourne une promesse
    fetch("http://localhost:3000/api/teddies/order", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: dataSubmit
        }).then(response => { // premier then qui reçoit la réponse en objet qui doit être convertie en json

            return response.json();

        }).then(result => { // deuxième then qui qui traite les données json
            localStorage.setItem('contact', JSON.stringify(result.contact));
            localStorage.setItem('orderId', JSON.stringify(result.orderId));
            localStorage.setItem('total', JSON.stringify(total));
            localStorage.removeItem('product');
            localStorage.removeItem('formulaire');
            window.location.replace("confirmation.html");
        }) //fonction catch pour traité le cas ou la promesse est rejeté 
        .catch((error) => {
            console.log(error);
        });
}
//affichage des produits du panier
// variable a déclarer
const showBasket = document.querySelector("#monpanier");
const showBasketnotempty = document.querySelector("#contenue");
let items = JSON.parse(localStorage.getItem('product'));
let total = 0;


// Contenu du panier
function productBasket() {
    // si le LocalStorage  n'est pas vide l'afficher 
    if (localStorage.getItem('product') !== null) {



        //initialisation du total à 0
        let html = "";
        // Affichage des articles + prix + quantité +  selection de couleur + button de supression 
        items.forEach((product) => {

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
            AddForm();
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
        //window.location.href = "index.html";

    }


}
productBasket();
AddNumber();
deleteAll();

const btnSendForm = document.querySelector(".commande");

// mettre l'objet dans le Localstorage 


// gestion validation du formulaire

// Si le localstorage n'est pas vide, récupérer l'id des produits dans un nouveau tableau
if (localStorage.getItem('product') !== null) {
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
        // si le controle est true alors setItem dans le localstorage. sinon alert remplir le formulaires
        if (firstNameControle() && lastNameControle() && emailControle() && adressControle() && cityControle()) {
            localStorage.setItem("formulaire", JSON.stringify(contact));

        } else {
            alert("remplir le formulaire");
        }


        // mettre les valeurs formulaire et panier selectionné dans un objet a envoyer sur le server


        //controle des value formulaire
        function firstNameControle() {
            const firstName = contact.firstName;
            if (regExControlName(firstName)) {
                return true;
            } else {
                alert("Le champs du formulaire doit contenir que des lettres \n Il doit contenir un minimum de 2 caractères jusqu'a 15 caractères");
                return false;
            }
        }

        function lastNameControle() {
            const lastName = contact.lastName;
            if (regExControlName(lastName)) {
                return true;
            } else {
                alert("Le champs du formulaire doit contenir que des lettres \n Il doit contenir un minimum de 2 caractères jusqu'a 15 caractères");
                return false;
            }
        }


        function emailControle() {
            const email = contact.email;
            if (regExControlEmail(email)) {
                return true;
            } else {
                alert("Adresse Email non Valide");
                return false;
            }
        }

        function adressControle() {
            const adress = contact.adress;
            if (regExControlAdress(adress)) {
                return true;
            } else {
                alert("verifier le champs adresse");

                return false;

            }
        }

        function cityControle() {
            const city = contact.city;
            if (regExControlCity(city)) {
                return true;
            } else {
                alert("verifier le champs de la ville ");
                return false;
            }
        }

        // variable qui réunis les données a envoyé au serveur, les id des produits présent dans le panier, et les donnnées récupérer dans le localStorage
        const dataSubmit = JSON.stringify({
            products,
            contact,
        });
        // envoie de l'objet dans le server
        postOrder(dataSubmit);


    });
};

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
            //displayError();
            console.log(error);
        });
}
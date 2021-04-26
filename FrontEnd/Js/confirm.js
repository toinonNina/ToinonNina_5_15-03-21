// récupération des donnnées du localstorage pour être utilisé en variable plus tard
const contact = JSON.parse(localStorage.getItem("contact"));
const orderId = JSON.parse(localStorage.getItem("orderId"));
const total = JSON.parse(localStorage.getItem('total'));

// insertion HTML avec donnée récupéré pour confirmation de commande
function showConfirmation(dataconfirm) {
    if (dataconfirm) {
        confirm = `
<div class="card text-center cardsize">
  <div class="card-header confirmhead">
    Merci ${contact.firstName} de votre commande
  </div>
  <div class="card-body">
    <h5 class="card-title">Numéro de commande : ${orderId}</h5>
    <p class="card-text">Total de votre commande : ${total} € </p>
    <a href="index.html" class="btn btn-primary">Retour Accueil</a>
  </div>
</div>
`;

        dataconfirm.innerHTML = confirm;
    } else {
        console.log("erreur de chargement de page");
    }
}
showConfirmation(document.querySelector("#commande"));

//clear du localstorage dans sa totalité.
localStorage.removeItem('contact');
localStorage.removeItem('total');
localStorage.removeItem('orderId');
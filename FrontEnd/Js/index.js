var teddies;

// récupérer les données de l'API avec La promesse Fetch
const fetchTeddies = async(apiurl) => {
    teddies = await fetch(
            apiurl
        ).then(response => { return response.json(); })
        .catch((error) => {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        });

};

// intégrer les information dans le HTML et inclure le lien pour récupéré l'id du produit dans l'Url qui correspondra bien a la page du produit
const showTeddies = async(results) => {
    await fetchTeddies(url);
    if (results) {
        results.innerHTML = (

            teddies
            .map(teddie => (
                `<div class="card" style="width:18rem;">
                    <img class="card-img-top teddies-img" src="${teddie.imageUrl}" alt ="${teddie.name}" />
                    <div class="card-body">
                        <h2 class="card-title name">${teddie.name}</h2>
                        <p class="card-text price">${teddie.price / 100} €</p> 
                        <a href="produit.html?id=${teddie._id}" class="btn btn-primary">Détails du produit</a>
                    </div>
                </div>
                `
            )).join('')
        );
    } else {
        console.log("erreur de chargement de la page");
    }


};

showTeddies(document.getElementById("results"));
//function qui affichae dans le span la quantité d'article
showQuantity(localStorage.getItem('product'));
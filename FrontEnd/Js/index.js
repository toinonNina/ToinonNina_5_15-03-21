var teddies;
const results = document.getElementById("results");

// récupérer les données de l'API avec La promesse Fetch
const fetchTeddies = async() => {
    teddies = await fetch(
        url
    ).then(response => response.json());
    console.log(teddies);
};
// intégrer les information dans le HTML et inclure le lien pour récupéré l'id du produit dans l'Url qui correspondra bien a la page du produit
const showTeddies = async() => {
    await fetchTeddies();

    results.innerHTML = (

        teddies
        .map(teddie => (
            `<div class="card" style="width:18rem;">
                    <img class="card-img-top teddies-img" src="${teddie.imageUrl}" />
                    <div class="card-body">
                        <h2 class="card-title name">${teddie.name}</h2>
                        <p class="card-text price">${teddie.price / 100} €</p> 
                        <a href="produit.html?id=${teddie._id}" class="btn btn-primary">Détails du produit</a>
                    </div>
                </div>
                `
        )).join('')
    );
};

showTeddies();
AddNumber();
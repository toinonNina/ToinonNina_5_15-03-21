let nounours;

const fetchnours = async() => {
    nounours = await fetch(
        'http://localhost:3000/api/teddies'
    ).then(res => res.json());
    console.log(nounours);
};
fetchnours();
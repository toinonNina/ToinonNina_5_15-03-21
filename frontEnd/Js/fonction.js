const url = "http://localhost:3000/api/teddies";

// fonction pour afficher les option de couleur en liste.
function showOptionColor(colors) {
    let optionColor = '';
    for (let i = 0, size = colors.length; i < size; i++) {
        optionColor += ` <option>${(colors[i])}</option>`;
    }
    return optionColor;
};


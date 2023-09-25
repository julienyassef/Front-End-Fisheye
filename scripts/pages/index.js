import photographerTemplate from '../templates/photographer.js'
import { getPhotographers } from '../utils/getData.js'

// function qui affiche les donnés des photographes dans le DOM
const displayData = async(photographers) => {
    // sélection une div en html pour mettre le tableau
    const photographersSection = document.querySelector(".photographer_section");

    // parcourt chaque photographe dans le tableau des donnés
    photographers.forEach((photographer) => {
        // Utilise un modèle de card pour créer une card pour chaque photographe.
        const photographerModel = photographerTemplate(photographer);
        // Obtient le contenu DOM de la card  à partir du modèle créé dans l'autre fichier js.
        // console.log(photographerModel)
        const userCardDOM = photographerModel.getUserCardDOM();
        // console.log(userCardDOM)
        //ajout la carte dans le DOM
        photographersSection.appendChild(userCardDOM);
    });
}

const init = async() => {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
    console.log(photographers)
}

init();



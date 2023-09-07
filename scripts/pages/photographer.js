import { getPhotographers } from "../utils/getData.js"
//Mettre le code JavaScript lié à la page photographer.html

// permet de récupérer l'ID du photographe sur l'url de la page 
const getID = () => {
    // Création de const URL à partir de l'URL de la fenêtre du navigateur
    const url = new URL(window.location.href)
    // Extraction des paramètres de recherche de l'URL
    const params = url.searchParams
     // récupère la valeurt de l''id' de l'URL
    const id = params.get('id')
    return id
}

const getPhotographer = async () => {
    //permet d'utiliser l'ID récupéré dans l'URL dans la function en dynamique
    const photographerId = getID();
    const data = await getPhotographers();

    const photographers = data.photographers
    const medias = data.media

    console.log(photographers)
    console.log(medias)

    // trouver dans data tout ce qui est en relation avec le photographerId
    // boucler sur data.photographer
    // boucler sur data.medias
    const photographerDetail = photographers.find(photographer => photographer.id == photographerId)
    // display header(photographerDetail) <== factory
    
}

// // function qui affiche les donnés des photographes dans le DOM
// const displayData = async(photographers) => {
//     // sélection une div en html pour mettre le tableau
//     const photographersSection = document.querySelector(".photographer_section");
//     console.log(photographersSection)

//     // parcourt chaque photographe dans le tableau des donnés
//     photographers.forEach((photographer) => {
//         // Utilise un modèle de card pour créer une card pour chaque photographe.
//         const photographerModel = photographerTemplate(photographer);
//         // Obtient le contenu DOM de la card  à partir du modèle créé dans l'autre fichier js.
//         // console.log(photographerModel)
//         const userCardDOM = photographerModel.getUserCardDOM();
//         // console.log(userCardDOM)
//         //ajout la carte dans le DOM
//         photographersSection.appendChild(userCardDOM);
//     });
// }

getPhotographer()
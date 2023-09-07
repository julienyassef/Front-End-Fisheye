import pagePhotographerTemplate from '../templates/page-photographer.js'
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

    // Trouve le photographe dont l'ID correspond à celui dans l'URL
    const photographerDetail = photographers.find(photographer => photographer.id == photographerId)

    if (photographerDetail) {
        // Utilise la card créé pour la page
        const photographerModel = pagePhotographerTemplate(photographerDetail);
        // Obtient le contenu DOM de la card créé
        const userCardDOM = photographerModel.getUserCardDOM();

        // Sélectionne une div en HTML pour mettre la card
        const photographersSection = document.querySelector("main");

        // Ajoute la carte au DOM
        photographersSection.appendChild(userCardDOM);
    }
  
}

getPhotographer()
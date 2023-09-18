
import pagePhotographerTemplate from '../templates/factory-photographer.js'
import pageMediaTemplate from '../templates/factory-media.js'
import { getPhotographers } from "../utils/getData.js"
import  getCardWindowCount from '../utils/windowCount.js'
import { displayModal } from '../utils/contactForm.js'

// permet de récupérer l'ID du photographe sur l'url de la page 
export const getID = () => {
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

    // Trouve le photographe dont l'ID correspond à celui dans l'URL
    const photographerDetail = photographers.find(photographer => photographer.id == photographerId)


    if (photographerDetail) {
        // Utilise la card créé pour la page
        const photographerModel = pagePhotographerTemplate(photographerDetail);
        // Obtient le contenu DOM de la card créé
        const userCardDOM = photographerModel.getUserCardDOM();

        // Sélectionne une div en HTML pour mettre la card
        const photographersSection = document.querySelector(".header-profil");

        // Ajoute la carte au DOM

          photographersSection.appendChild(userCardDOM);

          // import la card windowcount

        const windowCountElements = getCardWindowCount([photographerDetail]);
            photographersSection.appendChild(windowCountElements[0]);  
            
    
        const mediaSection = document.querySelector('.media-photographer');

        

        // Filtrer les médias du photographe actuel 
        const mediaOfPhotographer = medias.filter(media => media.photographerId == photographerId);

        // Pour chaque média du photographe actuel :
            for (let i = 0; i < mediaOfPhotographer.length; i++) {
            const media = mediaOfPhotographer[i];
            const mediaModel = await pageMediaTemplate(media);
            const mediaCardDOM = mediaModel.getModelCardDOM();
            mediaSection.appendChild(mediaCardDOM);   
        };

        // =======================================
        //      modal ajout name photographer
        // =======================================

         const name = photographerDetail.name; 

         // Ajout le nom à la modale
         const nameModal = document.querySelector(".modal__name");
         const createH3Modal = document.createElement("h3");
         createH3Modal.textContent = name;
         createH3Modal.classList.add("modal__name__photographer");
         createH3Modal.setAttribute ('aria-label', 'nom du photographe: ${name}');
         nameModal.appendChild(createH3Modal);
        
    }
    
}

getPhotographer()

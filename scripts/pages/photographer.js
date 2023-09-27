
import pagePhotographerTemplate from '../templates/factory-photographer.js'
import pageMediaTemplate from '../templates/factory-media.js'
import { getPhotographers } from "../utils/getData.js"
import  getCardWindowCount from '../utils/windowCount.js'
import { displayModal } from '../utils/contactForm.js'
import Lightbox from '../utils/lightbox.js'

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

export const getPhotographer = async () => {
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
            photographersSection.appendChild(userCardDOM);

          // import la card windowcount
        const windowCountElements = getCardWindowCount([photographerDetail]);
            photographersSection.appendChild(windowCountElements[0]);  
            
        const mediaSection = document.querySelector('.media-photographer');

        // Filtrer les médias du photographe actuel 
        const mediaOfPhotographer = medias.filter(media => media.photographerId == photographerId);

        // console.log(mediaOfPhotographer);

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

        // =======================================
        //      Count like page
        // =======================================

        const likeHeart = document.querySelector('.media-photographer__card__content__like__heart');
        const nbrLikeWindowCount= document.querySelector ('.media-photographer__window-count__like__nbr');
        
        
        let total = 0;
        const likes =  Array.from(document.querySelectorAll('.media-photographer__card__content__like__nbr'));
        let isLiked = false;

        likes.forEach((like) => {
            total += parseInt(like.innerHTML);
        });
        
        nbrLikeWindowCount.textContent = total
        nbrLikeWindowCount.setAttribute('aria-label',`${total} de like `);

        likeHeart.addEventListener('click', () => {
            if (!isLiked) {
                total += 1;
        
            nbrLikeWindowCount.textContent = total;
            nbrLikeWindowCount.setAttribute('aria-label', `${total} de like`);

            likeHeart.removeEventListener('click', () => {});

            isLiked = true;
            }
        });
   
        // =======================================
        //      Menu trier par 
        // =======================================  

        const menu = document.getElementById('menu-trier');
        const options = menu.querySelectorAll('.select-container__menu__option');
        const contenu = document.querySelectorAll('.media-photographer__card');
        const contenuContainer = document.querySelector('.media-photographer');
  
        
    
        options.forEach(option => {
            option.addEventListener('click', () => {
                const critereDeTri = option.textContent.toLowerCase();
                
            const contenuTrié = Array.from(contenu).sort((a, b) => {
                   
            if (critereDeTri === 'popularité') {
                const populariteA = parseInt(a.querySelector('.media-photographer__card__content__like__nbr').textContent);
                const populariteB = parseInt(b.querySelector('.media-photographer__card__content__like__nbr').textContent);
                return populariteB - populariteA; 
            } else if (critereDeTri === 'date') {
                // A venir
            } else if (critereDeTri === 'titre') {
                const titreA = a.querySelector('.media-photographer__card__content__description').textContent.toLowerCase();
                const titreB = b.querySelector('.media-photographer__card__content__description').textContent.toLowerCase();
                return titreA.localeCompare(titreB); 
            }
            return 0;
            });

            // Remplacez le contenu existant par le contenu trié
            contenu.forEach(element => element.remove());
            contenuTrié.forEach(element => contenuContainer.appendChild(element));
        });
        });





 // initialisation de la lightbox uniquement quand les
 // media sont chargés
 Lightbox.init()
}


getPhotographer()


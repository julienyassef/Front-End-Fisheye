
import pagePhotographerTemplate from '../templates/factory-photographer.js'
import pageMediaTemplate from '../templates/factory-media.js'
import { getPhotographers } from "../utils/getData.js"



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

    // console.log(photographers)
    // console.log(medias)

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

        const mediaSection = document.querySelector('.media-photographer');
        const mediaOfPhotographer = medias.filter(media => media.photographerId == photographerId);

        const windowCount =  document.createElement ('div')  
            windowCount.classList.add('media-photographer__window-count')
        
        mediaOfPhotographer.forEach(media => {
            const mediaModel = pageMediaTemplate(media);
            const mediaCardDOM = mediaModel.getModelCardDOM();
            mediaSection.appendChild(mediaCardDOM);
            mediaSection.appendChild(windowCount);

        });

        // fenetre compteur like et prix journalier
        
        const likeWindowCount= document.createElement ('div');
                likeWindowCount.classList.add('media-photographer__window-count__like');
    
        const nbrLikeWindowCount= document.createElement ('div');
            nbrLikeWindowCount.textContent = `15`;
            nbrLikeWindowCount.classList.add('media-photographer__window-count__like__nbr');
            // nbrLikeWindowCount.setAttribute('aria-label', `${likes} de like de la ${mediaSource}: ${title}`);
            
        const heartWindowCount = document.createElement('img');
            heartWindowCount.src = 'assets/icons/heartblack.svg'; 
            heartWindowCount.alt = "Heart Icon";
            heartWindowCount.classList.add('media-photographer__window-count__like__heart');
            heartWindowCount.setAttribute ('aria-label', 'icon coeur');
    

        const { name, portrait, city, country, tagline, price, id } = data;

        const priceDay= document.createElement ('div');
            priceDay.textContent = `${price}€ / jour`;
            priceDay.classList.add('media-photographer__window-count__price');
            priceDay.setAttribute ('aria-label', `${price}€ / jour`);

            windowCount.appendChild(likeWindowCount);
                likeWindowCount.appendChild(nbrLikeWindowCount)
                likeWindowCount.appendChild(heartWindowCount)
                windowCount.appendChild(priceDay);
    } 
    



    // fetch('./data/photographers.json')
    //     .then(response => response.json())
    //     .then(data => {
    //         const mediaSection = document.querySelector('.media-photographer');

    //         data.media.forEach(media => {
    //             const mediaModel = pageMediaTemplate(media);
    //             const mediaCardDOM = mediaModel.getModelCardDOM();
    //             mediaSection.appendChild(mediaCardDOM);
    //         });
    //     })
    //     .catch(error => {
    //         console.error('Une erreur s\'est produite lors du chargement du fichier JSON :', error);
    //     });

        
  
}

getPhotographer()
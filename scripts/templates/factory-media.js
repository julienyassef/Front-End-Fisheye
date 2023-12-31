import { getID } from "../pages/photographer.js";
import { getPhotographerFromID } from "../utils/getData.js";

const pageMediaTemplate = async (data) => {
    const { photographerId, title, image, video, likes, id, date } = data;

   // Obtenir l'ID du photographe à partir de l'URL
    const idFromUrl = getID()
    // Récupérer les données du photographe en utilisant l'ID de l'URL
    const photographer = await getPhotographerFromID(idFromUrl);
     // Extraire le nom du photographe des données du photographe
    const photographerName = photographer.name.split(' ')[0].replace('-', ' ')

    let mediaType;
    let mediaSource;

    // Déterminer le type de média (image ou vidéo) et définir le chemin source
    if (image) {
        mediaType = "image";
        mediaSource = `Sample Photos/${photographerName}/${image}`;
    } else if (video) {
        mediaType = "video";
        mediaSource = `Sample Photos/${photographerName}/${video}`;
    }

    const getModelCardDOM = () => {

        const mediaCard = document.createElement('article');
        mediaCard.classList.add('media-photographer__card');
        mediaCard.setAttribute('date', date);
        mediaCard.setAttribute('tabindex', '0');
       
        const linkMediaCard = document.createElement('a');
        linkMediaCard.classList.add('media-photographer__a');
        linkMediaCard.setAttribute('tabindex', '0');
       

        if (mediaType === "image") {
            const img = document.createElement('img');
            img.src = mediaSource;
            img.alt = title;
            img.classList.add('media-photographer__card__img');
            linkMediaCard.appendChild(img);
            linkMediaCard.href = `Sample Photos/${photographerName}/${image}`;
            linkMediaCard.title= title; 
            img.setAttribute('tabindex', '1');
            mediaCard.setAttribute('aria-label', `photo représentant : ${title}`);
        } else if (mediaType === "video") {
            const videoPreview = document.createElement('video');
            videoPreview.src = mediaSource; 
            videoPreview.alt = `Aperçu de la vidéo : ${title}`; 
            videoPreview.classList.add('media-photographer__card__video');
            linkMediaCard.appendChild(videoPreview);
            linkMediaCard.href = `Sample Photos/${photographerName}/${video}`;
            linkMediaCard.title= title; 
            videoPreview.setAttribute('tabindex', '1');
            mediaCard.setAttribute('aria-label', `vidéo de : ${title}`);
        }

        linkMediaCard.setAttribute('aria-label', `lien vers la ${mediaType}: ${title}` );

        const contentCardMedia = document.createElement ('div');
        contentCardMedia.classList.add('media-photographer__card__content');
        contentCardMedia.setAttribute('tabindex', '0');
        const descriptionCard= document.createElement ('h3');
        descriptionCard.textContent = title;

        descriptionCard.classList.add('media-photographer__card__content__description'); 
        descriptionCard.setAttribute('tabindex', '1');        
        const likeCard= document.createElement ('div');
        likeCard.classList.add('media-photographer__card__content__like');

        const nbrLikeCard= document.createElement ('div');
        nbrLikeCard.textContent = `${likes}`;
        nbrLikeCard.classList.add('media-photographer__card__content__like__nbr');
        nbrLikeCard.setAttribute('tabindex', '1');
        nbrLikeCard.setAttribute('aria-label', `nombre de like : ${likes}`);

        const heartCard = document.createElement('img');
        heartCard.src = 'assets/icons/heart.svg'; 
        heartCard.classList.add('media-photographer__card__content__like__heart');
        heartCard.setAttribute('tabindex', '0');
        heartCard.alt = "";

        // =======================================
        //     ajout des balises à la card
        // =======================================

        mediaCard.appendChild(linkMediaCard)
        mediaCard.appendChild(contentCardMedia);
        mediaCard.appendChild(contentCardMedia);
        contentCardMedia.appendChild(descriptionCard);
        contentCardMedia.appendChild(likeCard);
        likeCard.appendChild(nbrLikeCard);
        likeCard.appendChild(heartCard);


        return mediaCard;
    }

    return { photographerId, title, image, video, likes, id, getModelCardDOM }; 
}

export default pageMediaTemplate;

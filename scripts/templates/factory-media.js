import { getID } from "../pages/photographer.js";
import { getPhotographerFromID } from "../utils/getData.js";

const pageMediaTemplate = async (data) => {
    const { photographerId, title, image, video, likes, id } = data;

    // on veut récupérer le nom du photographe qui a l'id de l'url
    const idFromUrl = getID()
    const photographer = await getPhotographerFromID(idFromUrl);
    const photographerName = photographer.name.split(' ')[0].replace('-', ' ')

    let mediaType;
    let mediaSource;

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

        const linkMediaCard = document.createElement('a');
        linkMediaCard.classList.add('media-photographer__a');
        linkMediaCard.setAttribute('title', title);
        

        if (mediaType === "image") {
            const img = document.createElement('img');
            img.src = mediaSource;
            img.alt = title;
            img.classList.add('media-photographer__card__img');
            img.setAttribute('alt', `photo de : ${title}`);
            linkMediaCard.appendChild(img);
            linkMediaCard.href = `Sample Photos/${photographerName}/${image}`;
        } else if (mediaType === "video") {
            const videoCard = document.createElement('video');
            videoCard.controls = true;
            videoCard.src = mediaSource;
            videoCard.alt = title;
            videoCard.type = "video/mp4";
            videoCard.classList.add('media-photographer__card__video');
            videoCard.setAttribute('alt', `vidéo de : ${title}`);
            linkMediaCard.appendChild(videoCard);
            linkMediaCard.href =`Sample Photos/${photographerName}/${video}`;
        }

        const contentCardMedia = document.createElement ('div');
        contentCardMedia.classList.add('media-photographer__card__content');

        const descriptionCard= document.createElement ('h3');
        descriptionCard.textContent = title;
        descriptionCard.classList.add('media-photographer__card__content__description');

        const likeCard= document.createElement ('div');
        likeCard.classList.add('media-photographer__card__content__like');

        const nbrLikeCard= document.createElement ('div');
        nbrLikeCard.textContent = `${likes}`;
        nbrLikeCard.classList.add('media-photographer__card__content__like__nbr');
        nbrLikeCard.setAttribute('aria-label', `${likes} de like de la ${mediaSource}: ${title}` );

        const heartCard = document.createElement('img');
        heartCard.src = 'assets/icons/heart.svg'; 
        heartCard.alt = "Heart Icon";
        heartCard.classList.add('media-photographer__card__content__like__heart');
        heartCard.setAttribute ('aria-label', 'icon coeur');
        

        // =======================================
        //      1 like par photo/vidéo
        // =======================================

        let likeCount = likes;
        let hasLiked = false; 

        
        heartCard.addEventListener('click', () => {
            if (!hasLiked) { // Vérifie si la photo/vidéo n'a pas encore cliqué
                likeCount += 1;
                nbrLikeCard.textContent = `${likeCount}`;
                nbrLikeCard.setAttribute('aria-label', `${likeCount} de like de la ${mediaSource}: ${title}`);
                
                hasLiked = true; // Marque la photo comme aimée
                
            }
        });

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

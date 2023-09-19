import { getID } from "../pages/photographer.js";
// import { getPhotographers } from "../utils/getData.js";
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
        
        // pour rajouter 1 like possible par photo
        let liked = false;

        heartCard.addEventListener('click', () => {
            if (!liked) { // Vérifiez si l'utilisateur n'a pas encore aimé la photo
                liked = true; // Marquez la photo comme aimée
                nbrLikeCard.textContent = `${likes + 1}`; 
                nbrLikeCard.setAttribute('aria-label', `${likes + 1} de like de la ${mediaSource}: ${title}`);
            }
});

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

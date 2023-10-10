import { getID } from "../pages/photographer.js";
import { getPhotographerFromID } from "../utils/getData.js";

const pageMediaTemplate = async (data) => {
    const { photographerId, title, image, video, likes, id, date } = data;

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
            img.setAttribute('tabindex', '1');
            mediaCard.setAttribute('aria-label', `photo représentant : ${title}`);
        } else if (mediaType === "video") {
            const videoCard = document.createElement('video');
            videoCard.controls = true;
            videoCard.src = mediaSource;
            videoCard.alt = title;
            videoCard.type = "video/mp4";
            videoCard.classList.add('media-photographer__card__video');
            linkMediaCard.appendChild(videoCard);
            videoCard.setAttribute('tabindex', '1');
            linkMediaCard.href =`Sample Photos/${photographerName}/${video}`;
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

        heartCard.addEventListener('focus', () => {
            // Récupérez la valeur actuelle de nbrLikeCard
            const currentLikes = parseInt(nbrLikeCard.textContent);
            
            // Comparez la valeur actuelle avec likes
            if (currentLikes === likes) {
              heartCard.alt = "Cliquez pour ajouter 1 like";
            } else {
              heartCard.alt = "Cliquez pour retirer 1 like";
            }
          });
        //   // si cliquez, le lecteur d'ecran en repete pas sa situation
        // heartCard.addEventListener('click', () => {
        // heartCard.setAttribute('aria-hidden', 'true');
        // heartCard.setAttribute('aria-live', 'vous avez ajouter un like');
        // });
            

        // // Ajoutez un gestionnaire d'événements pour gérer le focus
        // heartCard.addEventListener('focus', () => {
        // heartCard.setAttribute('aria-hidden', 'false'); // Affiche le commentaire lorsque l'image a le focus
        // });


         
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

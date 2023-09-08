

const pageMediaTemplate = (data) => {
    const { photographerId, title, image, video, likes, id } = data;

    const name = {
        82 : "Tracy",
        195 : "Marcel",
        243 : "Mimi",
        527 : "Nabeel",
        925 : "Rhode",
        930 : "Ellie Rose"
    };

    const photographerName = name[photographerId];

    // const picture = `Sample Photos/${photographerName}/${image}`;
// pourquoi j'ai pas réussi à faire photograperID === ID dans photpgrapher, voir avec bastien

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

        if (mediaType === "image") {
            const img = document.createElement('img');
            img.src = mediaSource;
            img.alt = title;
            img.classList.add('media-photographer__card__img');
            img.setAttribute('alt', `photo de : ${title}`);
            mediaCard.appendChild(img);
        } else if (mediaType === "video") {
            const video = document.createElement('video');
            video.src = mediaSource;
            video.alt = title;
            video.type = "video/mp4";
            video.classList.add('media-photographer__card__video');
            video.setAttribute('alt', `vidéo de : ${title}`);
            mediaCard.appendChild(video);
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

    const heartCard = document.createElement('img');
        heartCard.src = 'assets/icons/heart.svg'; 
        heartCard.alt = "Heart Icon";
        heartCard.classList.add('media-photographer__card__content__like__heart');
      
     
    
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

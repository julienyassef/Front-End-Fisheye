

const pageMediaTemplate = (data) => {
    const { photographerId, title, image, video, likes, id } = data;


    const name = {
        82 : "Tracy",
        195 : "Marcel",
        243 : "Mini",
        527 : "Nabeel",
        925 : "Rhode",
        930 : "Ellie Rose"
    };

    const photographerName = name[photographerId];

    const picture = `Sample Photos/${photographerName}/${image}`;
// pourquoi j'ai pas réussi à faire photograperID === ID dans photpgrapher, voir avec bastien
 
    const getModelCardDOM = () => {

        const mediaCard = document.createElement('article');
            mediaCard.classList.add('media-photographer__card');

        const img = document.createElement('img');
            img.src = picture;
            img.alt = title
            img.classList.add('media-photographer__card__img');
            img.setAttribute('alt', `photo de : ${title}`);

        const contentCardMedia = document.createElement ('div')
            contentCardMedia.classList.add('media-photographer__card__content')

        const descriptionCard= document.createElement ('h3')
            descriptionCard.textContent = title;
            descriptionCard.classList.add('media-photographer__card__content__description')

        const likeCard= document.createElement ('div')
            likeCard.textContent = `${likes} Likes`;
            likeCard.classList.add('media-photographer__card__content__like')

          
        mediaCard.appendChild(img);
        mediaCard.appendChild(contentCardMedia)
            contentCardMedia.appendChild(descriptionCard)
            contentCardMedia.appendChild(likeCard)

   

        return mediaCard;
    }

    return { photographerId, title, image, video, likes, id, getModelCardDOM }; 
}

export default pageMediaTemplate;

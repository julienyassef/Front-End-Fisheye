const getCardWindowCount = (photographers) => {
    const windowCounts = photographers.map((photographer) => {
        const price = photographer.price;
        
        const windowCount =  document.createElement ('div')  
            windowCount.classList.add('media-photographer__window-count')
    
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
    
    
        const priceDay= document.createElement ('div');
            priceDay.textContent = `${price}€ / jour`;
            priceDay.classList.add('media-photographer__window-count__price');
            priceDay.setAttribute ('aria-label', `${price}€ / jour`);
    
            windowCount.appendChild(likeWindowCount);
                likeWindowCount.appendChild(nbrLikeWindowCount)
                likeWindowCount.appendChild(heartWindowCount)
            windowCount.appendChild(priceDay);

            return (windowCount);
    });
    
    return windowCounts;
}

export default getCardWindowCount


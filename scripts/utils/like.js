export const CountLikes = () => {
    const totalLikes= document.querySelector('.media-photographer__window-count__like__nbr');
    const cardsLikeContainer = Array.from(document.querySelectorAll('.media-photographer__card__content__like'));
  
    let total = 0;
    cardsLikeContainer.forEach((card) => {
        const nbrLike = card.querySelector('.media-photographer__card__content__like__nbr')
        total += parseInt(nbrLike.innerHTML);
    });
    
    totalLikes.textContent = total
    totalLikes.setAttribute('aria-label',`${total} de like `);
    
    cardsLikeContainer.forEach((card) => {
        const heart = card.querySelector('.media-photographer__card__content__like__heart')
        const nbrLike = card.querySelector('.media-photographer__card__content__like__nbr')

        heart.addEventListener('click', () => {
            if (heart.classList.contains('liked')) {
                total -= 1;
                heart.classList.remove('liked');
                nbrLike.textContent = parseInt(nbrLike.textContent) - 1;
                heart.alt = "Cliquez pour ajouter un like";
            } else {
                total += 1;
                heart.classList.add('liked');
                nbrLike.textContent = parseInt(nbrLike.textContent) + 1;
                heart.alt = "Cliquez pour retirer un like";
            }

            totalLikes.textContent = total;
            totalLikes.setAttribute('aria-label', `${total} de like`);
        })
            // informe en focus la situation du like (ajouter ou retrait); utile pour le lecteur d'écran
        heart.addEventListener('focus', () => {
            if (heart.classList.contains('liked')) {    
                heart.alt = "Cliquez pour retirer un like";
            } else {
                heart.alt = "Cliquez pour ajouter un like";   
            }
        
          });
    })
}

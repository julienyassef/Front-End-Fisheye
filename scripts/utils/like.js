export const CountLikes = () => {
    // Sélectionne l'élément affichant le nombre total de likes
    const totalLikes= document.querySelector('.media-photographer__window-count__like__nbr');
    // Sélectionne tous les conteneurs de likes de cartes média
    const cardsLikeContainer = Array.from(document.querySelectorAll('.media-photographer__card__content__like'));
  
    let total = 0;
    // Parcourt chaque conteneur de likes de cartes média
    cardsLikeContainer.forEach((card) => {
        const nbrLike = card.querySelector('.media-photographer__card__content__like__nbr')
        // Incrémente le total avec le nombre de likes de la carte actuelle
        total += parseInt(nbrLike.innerHTML);
    });

    // Met à jour l'affichage du total de likes
    totalLikes.textContent = total
    totalLikes.setAttribute('aria-label',`${total} de like `);
    
    // Ajoute des écouteurs d'événements aux icônes de like dans les cartes média
    cardsLikeContainer.forEach((card) => {
        const heart = card.querySelector('.media-photographer__card__content__like__heart')
        const nbrLike = card.querySelector('.media-photographer__card__content__like__nbr')

        // l'événement 'click' sur l'icône de like
        heart.addEventListener('click', () => {
            if (heart.classList.contains('liked')) {
                total -= 1;
                heart.classList.remove('liked');
                nbrLike.textContent = parseInt(nbrLike.textContent) - 1;
                heart.alt = "Like retiré, cliquez pour ajouter un like";
            } else {
                total += 1;
                heart.classList.add('liked');
                nbrLike.textContent = parseInt(nbrLike.textContent) + 1;
                heart.alt = "Like ajouté, cliquez pour retirer un like";
            }

            // Met à jour l'affichage du total de likes 
            totalLikes.textContent = total;
            totalLikes.setAttribute('aria-label', `${total} de like`);
        });
            // informe en focus la situation du like (ajouter ou retrait); utile pour le lecteur d'écran
        heart.addEventListener('focus', () => {
            if (heart.classList.contains('liked')) {    
                heart.alt = "Cliquez pour retirer un like";
            } else {
                heart.alt = "Cliquez pour ajouter un like";   
            }
          });

          // permet lors de la navigation au clavier de valider le like, enter se comporte comme un click
        heart.addEventListener('keydown', (e) => {
            if (e.key ==="Enter" || e.keyCode === 13) {
                // Crée un événement de clic simulé et le déclenche
                const clickEvent = new MouseEvent("click", {
                  bubbles: true,
                  cancelable: true,
                  view: window
                });
                heart.dispatchEvent(clickEvent);
                totalLikes.textContent = total;
                totalLikes.setAttribute('aria-label', `${total} de like`);
            }
});
    })
}

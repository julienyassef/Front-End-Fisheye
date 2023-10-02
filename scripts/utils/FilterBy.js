export const filterBy= () => {

    const menu = document.getElementById('menu-trier');
    const options = menu.querySelectorAll('.select-container__menu__option');
    const contenu = document.querySelectorAll('.media-photographer__card');
    const contenuContainer = document.querySelector('.media-photographer');


    options.forEach(option => {
        option.addEventListener('click', () => {
            const criteria= option.textContent.toLowerCase();
            
        const contenuSorted = Array.from(contenu).sort((a, b) => {
               
        if (criteria === 'popularité') {
            const popularityA = parseInt(a.querySelector('.media-photographer__card__content__like__nbr').textContent);
            const popularityB = parseInt(b.querySelector('.media-photographer__card__content__like__nbr').textContent);
            return popularityB - popularityA; 
        } else if (criteria === 'date') {
            // A venir
            const dateA = a.getAttribute('date')
            const dateB = b.getAttribute('date')
            return new Date(dateB) - new Date(dateA)

        } else if (criteria === 'titre') {
            const titleA = a.querySelector('.media-photographer__card__content__description').textContent.toLowerCase();
            const titleB = b.querySelector('.media-photographer__card__content__description').textContent.toLowerCase();
            return titleA.localeCompare(titleB); 
        }
        return 0;
        });

        // Remplacez le contenu existant par le contenu trié
        contenu.forEach(element => element.remove());
        contenuSorted.forEach(element => contenuContainer.appendChild(element));
        });
    });
}
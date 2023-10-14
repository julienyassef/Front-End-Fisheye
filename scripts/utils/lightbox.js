
class Lightbox {
    static init() {
        // Sélectionne tous les liens d'images/vidéos
        const links = Array.from(document.querySelectorAll('.media-photographer__a'))
        // Crée une galerie d'images/vidéos avec les liens et titres
        const gallery = links.map(link => ({href: link.getAttribute('href'), title: link.getAttribute('title')}))

        // Ajoute un gestionnaire d'événement à chaque lien pour ouvrir le Lightbox
        links.forEach(link => link.addEventListener('click', e => {
            e.preventDefault()
            new Lightbox(e.currentTarget.getAttribute('href'), gallery);
        }));
    }

    // Focus sur le premier élément lors de l'ouverture du Lightbox
    focusOnOpen() {
        if (!this.element.contains(document.activeElement)) {
            const firstFocusableElement = this.element.querySelector('.lightbox__close');
            if (firstFocusableElement) {
                firstFocusableElement.focus();
            }
        }
    }
    
    constructor(url, mediaOfPhotographer) {
        // Aplatit la liste de médias du photographe
        const mediaOfPhotographerFlat = mediaOfPhotographer.map(media => media.href).flat();
        
        // Crée la structure DOM du Lightbox
        const element = this.buildDOM(url, mediaOfPhotographer);
        this.mediaOfPhotographerFlat = mediaOfPhotographer;
        this.currentIndex = mediaOfPhotographerFlat.findIndex(media => media === url);
        
        this.element = element;
        document.body.appendChild(element);
        document.addEventListener('keydown', this.onKeyDown.bind(this));

        // Met le focus sur le premier élément lors de l'ouverture
        this.focusOnOpen();
    }

    // Gère les événements clavier 
    onKeyDown(e) {
        switch (e.key) {
            case 'ArrowLeft':
                this.prev(e);
                break;
            case 'ArrowRight':
                this.next(e);
                break;
            case 'Escape':
                this.close(e);
                break;
            default:
                break;
        }
    }

     // Ferme le Lightbox
    close(e){
        e.preventDefault()
        this.element.classList.add('fadeOut')
        window.setTimeout(()=> {
            this.element.remove()
        }, 500)
        document.removeEventListener('keydown', this.onKeyDown);
        
    }

    // Affiche le média suivant
    next(e){
        e.preventDefault();
        this.currentIndex = (this.currentIndex + 1) % this.mediaOfPhotographerFlat.length;
        const nextURL = this.mediaOfPhotographerFlat[this.currentIndex].href;
        this.loadContent(nextURL) 
    }
    
     // Affiche le média précédent
    prev(e){
        e.preventDefault()
        this.currentIndex = (this.currentIndex - 1 + this.mediaOfPhotographerFlat.length) % this.mediaOfPhotographerFlat.length;
        const prevURL = this.mediaOfPhotographerFlat[this.currentIndex].href;
        this.loadContent(prevURL); 
    }

    // Charge un nouveau contenu dans le Lightbox
    loadContent(url) {
        // Supprimez l'ancien contenu du Lightbox
        this.element.innerHTML = '';
        // Construit la structure DOM avec le nouveau média
        const content = this.buildDOM(url, this.mediaOfPhotographerFlat);
        this.element.appendChild(content);
    }

    // Construit la structure DOM du Lightbox avec le média spécifié
    buildDOM(url, mediaOfPhotographer) {
        const media = mediaOfPhotographer.find(media => media.href === url)
        const dom = document.createElement('div');
        dom.classList.add('lightbox');
       

        if (url.endsWith('.mp4')) {
            dom.innerHTML = `<div class="lightbox__container">
            <button class="lightbox__close">Fermer</button>
            <button class="lightbox__next">Suivant</button>
            <button class="lightbox__prev">Précédent</button>
            <div class="lightbox__content">
            <video src="${url}" controls loop="auto" class="lightbox__container__img"></video>
            <p class="lightbox__container__title">${media.title}</p>
            </div>
            </div>`;
        }else {
            dom.innerHTML = `<div class="lightbox__container">
            <button class="lightbox__close">Fermer</button>
            <button class="lightbox__next">Suivant</button>
            <button class="lightbox__prev">Précédent</button>
            <div class="lightbox__content">
            <img src="${url}" class="lightbox__container__img">
            <p class="lightbox__container__title">${media.title}</p>
            </div>
            </div>`;
        }
        
        // Ajoute des gestionnaires d'événements aux boutons
        dom.querySelector('.lightbox__close').addEventListener('click', this.close.bind(this))
        dom.querySelector('.lightbox__next').addEventListener('click', this.next.bind(this))
        dom.querySelector('.lightbox__prev').addEventListener('click', this.prev.bind(this))

        return dom
    }
}

export default Lightbox
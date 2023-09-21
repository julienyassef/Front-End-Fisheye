class Lightbox {
    static init() {
        const links = Array.from(document.querySelectorAll('.media-photographer__a'))
        const gallery = links.map(link =>link.getAttribute('href'))
        links.forEach(link => link.addEventListener('click', e => {
            e.preventDefault()
            new Lightbox(e.currentTarget.getAttribute('href'), gallery);
        }));
    }
    
    constructor(url, gallery) {
        const element = this.buildDOM(url);
        this.gallery = gallery
        this.currentIndex = gallery.indexOf(url);
        this.element = element;
        document.body.appendChild(element);  
        document.addEventListener('keydown', this.onKeyDown.bind(this));
    }

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

    close(e){
        e.preventDefault()
        this.element.classList.add('fadeOut')
        window.setTimeout(()=> {
            this.element.remove()
        }, 500)
        document.removeEventListener('keydown', this.onKeyDown);
        
    }

    next(e){
        e.preventDefault();
        this.currentIndex = (this.currentIndex + 1) % this.gallery.length;
        const nextURL = this.gallery[this.currentIndex];
        this.loadContent(nextURL) 
    }

    prev(e){
        e.preventDefault()
        this.currentIndex = (this.currentIndex - 1 + this.gallery.length) % this.gallery.length;
        const prevURL = this.gallery[this.currentIndex];
        this.loadContent(prevURL); 
    }

    loadContent(url) {
        // Supprimez l'ancien contenu du Lightbox
        this.element.innerHTML = '';
        const content = this.buildDOM(url);
        this.element.appendChild(content);
    }
   
    buildDOM(url) {
        
        const dom = document.createElement('div');
        dom.classList.add('lightbox');

        if (url.endsWith('.mp4')) {
            dom.innerHTML = `<div class="lightbox__container">
            <button class="lightbox__close">Fermer</button>
            <button class="lightbox__next">Suivant</button>
            <button class="lightbox__prev">Précédent</button>
            <div class="lightbox__content">
            <video src="${url}" controls loop="auto" class="lightbox__container__img"></video>
            <p class="lightbox__container__title">titre</p>
            </div>
            </div>`;
        }else {
            dom.innerHTML = `<div class="lightbox__container">
            <button class="lightbox__close">Fermer</button>
            <button class="lightbox__next">Suivant</button>
            <button class="lightbox__prev">Précédent</button>
            <div class="lightbox__content">
            <img src="${url}" class="lightbox__container__img">
            <p class="lightbox__container__title">titre</p>
            </div>
            </div>`;
        }

        dom.querySelector('.lightbox__close').addEventListener('click', this.close.bind(this))
        dom.querySelector('.lightbox__next').addEventListener('click', this.next.bind(this))
        dom.querySelector('.lightbox__prev').addEventListener('click', this.prev.bind(this))

        return dom
    }
}

export default Lightbox
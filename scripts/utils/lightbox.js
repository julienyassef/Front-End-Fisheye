class Lightbox {
    static init() {
        const links = document.querySelectorAll('.media-photographer__a')
        links.forEach(link => link.addEventListener('click', e => {
            e.preventDefault()
            // console.log('Image clicked');
            new Lightbox(e.currentTarget.getAttribute('href'));
        }));
    }
    
    constructor(url) {
        const element = this.buildDOM(url);
        this.onkeyUp = this.onkeyUp.bind(this)
        this.element = element;
        document.body.appendChild(element);  
        document.addEventListener('keyup', this.onkeyUp)
    }

    onkeyUp (e) {
        if (e.key == 'Escape') {
            this.close(e)
        }
    }

    //ferme le lightbox
    close(e){
        e.preventDefault()
        this.element.classList.add('fadeOut')
        window.setTimeout(()=> {
            this.element.remove()
        }, 500)
        document.removeEventListener('keyup', this.onkeyUp)
        
    }
   

    buildDOM(url) {
        
        const dom = document.createElement('div');
        dom.classList.add('lightbox');

        if (url.endsWith('.mp4')) {
            dom.innerHTML = `<button class="lightbox__close">Fermer</button>
            <button class="lightbox__next">Suivant</button>
            <button class="lightbox__prev">Précédent</button>
            <div class="lightbox__container">
            <video src="${url}" controls loop="auto" >
            </div>`;
        }else {
            dom.innerHTML = `<button class="lightbox__close">Fermer</button>
            <button class="lightbox__next">Suivant</button>
            <button class="lightbox__prev">Précédent</button>
            <div class="lightbox__container">
              <img src="${url}"  >
            </div>`;
        }

        dom.querySelector('.lightbox__close').addEventListener('click', this.close.bind(this))

        return dom
    }
}

export default Lightbox
class Lightbox {
    static init() {
        document.addEventListener('DOMContentLoaded', () => {
           
            const links = document.querySelectorAll('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".mp4"]')
                .forEach(link => link.addEventListener('click', e => {
                    e.preventDefault()
                    new Lightbox(e.currentTarget.getAttribute('href'));
            }));
        });
    }
    
    /**
     * 
     * @param {string} url 
     */

    constructor(url) {
        const element = this.buildDOM(url);
        document.body.appendChild(element);
    }


     /**
     * 
     * @param {string} url 
     * @return {HTMLElement}
     */

    buildDOM(url) {
        const dom = document.createElement('div');
        dom.classList.add('lightbox');
        dom.innerHTML = `<button class="lightbox__close">Fermer</button>
        <button class="lightbox__next">Suivant</button>
        <button class="lightbox__prev">Précédent</button>
        <div class="lightbox__container">
          <img src="Sample Photos/Tracy/Fashion Yellow Beach.jpg" alt="">
        </div>`;
        
        return dom;
    }
}

// "Sample Photos/Tracy/Fashion Yellow Beach.jpg"

Lightbox.init();
